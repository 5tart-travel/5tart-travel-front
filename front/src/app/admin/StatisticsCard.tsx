'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaUsers, FaBuilding } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const MIN_TOTAL = 100;
const POLLING_INTERVAL = 5000; // 5 segundos

const StatisticsCard: React.FC = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalAgencies: 0,
    activeAgencies: 0,
    inactiveAgencies: 0,
  });

  const fetchData = async () => {
    try {
      const [userResponse, agencyResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/agency`),
      ]);

      const users = userResponse.data;
      const agencies = agencyResponse.data;

      const activeUsersCount = users.filter(
        (user: any) => user.isActive,
      ).length;
      const inactiveUsersCount = users.length - activeUsersCount;

      const activeAgenciesCount = agencies.filter(
        (agency: any) => agency.isActive,
      ).length;
      const inactiveAgenciesCount = agencies.length - activeAgenciesCount;

      setData({
        totalUsers: users.length,
        activeUsers: activeUsersCount,
        inactiveUsers: inactiveUsersCount,
        totalAgencies: agencies.length,
        activeAgencies: activeAgenciesCount,
        inactiveAgencies: inactiveAgenciesCount,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const chartData = (value: number, total: number, color: string) => {
    const adjustedTotal = total < MIN_TOTAL ? MIN_TOTAL : total;
    return {
      datasets: [
        {
          data: [value, adjustedTotal - value],
          backgroundColor: [color, '#e0e0e0'],
          borderWidth: 1,
        },
      ],
    };
  };

  const charts = [
    {
      label: 'Activos',
      value: data.activeUsers,
      total: data.totalUsers,
      color: '#36a2eb',
      icon: <FaUsers className="text-white text-lg" />,
    },
    {
      label: 'Inactivos',
      value: data.inactiveUsers,
      total: data.totalUsers,
      color: '#ff6384',
      icon: <FaUsers className="text-white text-lg" />,
    },
    {
      label: 'Agen. Activas',
      value: data.activeAgencies,
      total: data.totalAgencies,
      color: '#4bc0c0',
      icon: <FaBuilding className="text-white text-lg" />,
    },
    {
      label: 'Agen. Inactivas',
      value: data.inactiveAgencies,
      total: data.totalAgencies,
      color: '#ffcd56',
      icon: <FaBuilding className="text-white text-lg" />,
    },
  ];

  const calculatePercentage = (value: number, total: number) => {
    const adjustedTotal = total < MIN_TOTAL ? MIN_TOTAL : total;
    return ((value / adjustedTotal) * 100).toFixed(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-600 text-shadow-medium">
        Agencias y usuarios
      </h2>
      <div className="flex flex-wrap justify-around">
        {charts.map((chart, index) => (
          <div key={index} className="flex flex-col items-center w-1/4">
            <div className="relative w-32 h-w-32">
              <Doughnut
                data={chartData(chart.value, chart.total, chart.color)}
                options={{ cutout: '70%' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`rounded-full w-12 h-12 flex items-center justify-center`}
                  style={{ backgroundColor: chart.color }}
                >
                  {chart.icon}
                </div>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-700 mt-4">
              {calculatePercentage(chart.value, chart.total)}%
            </p>
            <p className="text-md text-gray-500">{chart.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;
