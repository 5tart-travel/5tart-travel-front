'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaBuilding, FaDollarSign, FaPercentage } from 'react-icons/fa';

const StatisticsCard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [totalAgencies, setTotalAgencies] = useState(0);
  const [activeAgencies, setActiveAgencies] = useState(0);
  const [inactiveAgencies, setInactiveAgencies] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('https://fivetart-travel-kafg.onrender.com/user');
        const agencyResponse = await axios.get('https://fivetart-travel-kafg.onrender.com/agency');
        const orderResponse = await axios.get('https://fivetart-travel-kafg.onrender.com/order');

        const users = userResponse.data;
        const agencies = agencyResponse.data;
        const orders = orderResponse.data;

        const activeUsersCount = users.filter((user: any) => user.isActive).length;
        const inactiveUsersCount = users.length - activeUsersCount;

        const activeAgenciesCount = agencies.filter((agency: any) => agency.isActive).length;
        const inactiveAgenciesCount = agencies.length - activeAgenciesCount;

        const income = orders.reduce((acc: number, order: any) => acc + order.price, 0);
        const profit = income * 0.1;

        setTotalUsers(users.length);
        setActiveUsers(activeUsersCount);
        setInactiveUsers(inactiveUsersCount);
        setTotalAgencies(agencies.length);
        setActiveAgencies(activeAgenciesCount);
        setInactiveAgencies(inactiveAgenciesCount);
        setTotalIncome(income);
        setTotalProfit(profit);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: 'Usuarios Activos', value: activeUsers, total: totalUsers, color: 'bg-green-500', icon: <FaUsers /> },
    { label: 'Usuarios Inactivos', value: inactiveUsers, total: totalUsers, color: 'bg-blue-500', icon: <FaUsers /> },
    { label: 'Agencias Activas', value: activeAgencies, total: totalAgencies, color: 'bg-pink-500', icon: <FaBuilding /> },
    { label: 'Agencias Inactivas', value: inactiveAgencies, total: totalAgencies, color: 'bg-yellow-500', icon: <FaBuilding /> },
    { label: 'Total Ingresos', value: totalIncome, total: totalIncome, color: 'bg-orange-500', icon: <FaDollarSign /> },
    { label: 'Total Ganancias', value: totalProfit, total: totalIncome, color: 'bg-purple-500', icon: <FaPercentage /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex space-x-4 justify-around">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="relative w-12 h-48 bg-gray-200 rounded-lg flex justify-center items-end overflow-hidden">
              <div
                className={`absolute bottom-0 w-full ${stat.color} flex justify-center items-center`}
                style={{ height: `${stat.total > 0 ? (stat.value / stat.total) * 100 : 0}%` }}
              >
                <span className="text-white text-sm font-semibold transform rotate-90">
                  {stat.total > 0 ? `${((stat.value / stat.total) * 100).toFixed(2)}%` : '0%'}
                </span>
              </div>
              <div className="absolute bottom-0 flex flex-col items-center justify-center h-full w-full p-2">
                <div className="text-white text-sm font-semibold transform rotate-90">
                  {stat.label}
                </div>
              </div>
            </div>
            <div className={`text-white p-2 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-lg font-semibold text-gray-700">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;
