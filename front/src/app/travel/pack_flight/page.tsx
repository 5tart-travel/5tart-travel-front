import React from 'react';

const PackFlights: React.FC = () => {
  const flights = [
    { date: 'Mar. 30/07/2024', duration: '13 horas', type: 'directos', price: '$477.920' },
    { date: 'Vie. 26/07/2024', duration: '13 horas', type: 'directos', price: '$478.848' },
    { date: 'Sáb. 20/07/2024', duration: '13 horas', type: 'directos', price: '$479.776' },
    { date: 'Jue. 25/07/2024', duration: '13 horas', type: 'directos', price: '$479.776' },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {flights.map((flight, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b last:border-none">
            <div className="flex items-center space-x-4">
              <div className="text-gray-500">{flight.date}</div>
              <div className="text-gray-500">{flight.duration}</div>
              <div className="text-gray-500">{flight.type}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-blue-500 font-bold">{flight.price}</div>
              <button className="text-blue-500 hover:underline">Ver vuelos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackFlights;
