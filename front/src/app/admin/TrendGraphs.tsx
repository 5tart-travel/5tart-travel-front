
"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendGraphs: React.FC = () => {
  const data = {
    labels: [  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Usuarios ',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Agencias',
        data: [28, 48, 40, 19, 86, 27 , 90],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
      },
      {
        label: 'Ingresos',
        data: [90, 79, 53, 70, 46, 100,80  ],
        borderColor: 'rgba(255,159,64,1)',
        backgroundColor: 'rgba(255,159,64,0.2)',
      },
    ],
  };

  return (
    <div className="bg-white hover:bg-slate-50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow p-4 w-[100%] h-[280px]">
      {/* <h3 className="text-xl font-bold  text-gray-400 ">Gráficos de Tendencias</h3> */}
      <Line data={data} />
    </div>
  );
};

export default TrendGraphs;
