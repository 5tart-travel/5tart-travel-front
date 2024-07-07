import React from 'react';

const ImportantAlerts: React.FC = () => {
  const alerts = [
    'Solicitud pendiente de la agencia "Viajes XYZ".',
    'Problema de pago con el usuario "Juan Pérez".',
    'Nueva agencia registrada: "Turismo ABC".',
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-xl font-bold mb-4">Alertas Importantes</h3>
      <ul className="space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="bg-red-100 text-red-700 p-2 rounded-lg shadow-sm">
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImportantAlerts;



// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ImportantAlerts: React.FC = () => {
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const response = await axios.get('/api/alerts/important');
//         setAlerts(response.data.data);
//       } catch (error) {
//         console.error('Error fetching alerts:', error);
//       }
//     };

//     fetchAlerts();
//   }, []);

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4">
//       <h3 className="text-xl font-bold mb-4">Alertas Importantes</h3>
//       <ul className="space-y-2">
//         {alerts.map((alert, index) => (
//           <li key={index} className="bg-red-100 text-red-700 p-2 rounded-lg shadow-sm">
//             {alert.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ImportantAlerts;

