// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TrendGraphs: React.FC = () => {
//   const [userStats, setUserStats] = useState([]);
//   const [reservationStats, setReservationStats] = useState([]);
//   const [revenueStats, setRevenueStats] = useState([]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const userResponse = await axios.get('/api/stats/new-users?year=2024');
//         const reservationResponse = await axios.get('/api/stats/reservations?year=2024');
//         const revenueResponse = await axios.get('/api/stats/revenue?year=2024');

//         setUserStats(userResponse.data.data);
//         setReservationStats(reservationResponse.data.data);
//         setRevenueStats(revenueResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const labels = userStats.map(stat => stat.month);
//   const userData = userStats.map(stat => stat.count);
//   const reservationData = reservationStats.map(stat => stat.count);
//   const revenueData = revenueStats.map(stat => stat.count);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Usuarios Nuevos',
//         data: userData,
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//       },
//       {
//         label: 'Reservas',
//         data: reservationData,
//         borderColor: 'rgba(153,102,255,1)',
//         backgroundColor: 'rgba(153,102,255,0.2)',
//       },
//       {
//         label: 'Ingresos',
//         data: revenueData,
//         borderColor: 'rgba(255,159,64,1)',
//         backgroundColor: 'rgba(255,159,64,0.2)',
//       },
//     ],
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4">
//       <h3 className="text-xl font-bold mb-4">Gráficos de Tendencias</h3>
//       <Line data={data} />
//     </div>
//   );
// };

// export default TrendGraphs;

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
    labels: [ 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Usuarios ',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Agencias',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
      },
      {
        label: 'Ingresos',
        data: [65, 59, 80, 81, 56, 55],
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
