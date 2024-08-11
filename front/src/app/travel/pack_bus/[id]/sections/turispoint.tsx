import React, { useState, useEffect } from 'react';
import { IBusTour } from '@/interface/IBusTour';

interface TouristPointsSectionProps {
  busDetails: IBusTour;
  onTotalPriceChange: (totalPrice: number) => void; // Callback para enviar el total
}

const TouristPointsSection: React.FC<TouristPointsSectionProps> = ({ busDetails, onTotalPriceChange }) => {
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const [totalPointsPrice, setTotalPointsPrice] = useState<number>(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = busDetails.touristPoints
        .filter((point) => selectedPoints.includes(point.name))
        .reduce((acc, point) => acc + point.price, 0);
      setTotalPointsPrice(total);
    };

    calculateTotalPrice();
  }, [selectedPoints, busDetails.touristPoints]);

  useEffect(() => {
    onTotalPriceChange(totalPointsPrice);
  }, [totalPointsPrice, onTotalPriceChange]);

  if (!busDetails.touristPoints || busDetails.touristPoints.length === 0) {
    return null;
  }

  const handleStarClick = (pointName: string) => {
    setSelectedPoints((prevSelectedPoints) =>
      prevSelectedPoints.includes(pointName)
        ? prevSelectedPoints.filter((name) => name !== pointName)
        : [...prevSelectedPoints, pointName]
    );
  };

  return (
    <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl font-bold text-center mt-10 mb-5 text-gray-600 text-shadow-medium ">Selecciona tu actividad favorita</h2>
    <div className="flex items-center mb-1 mt-10">
      <hr className="border-gray-500 flex-grow opacity-20" />
      <h2 className="text-lg font-bold text-gray-400 mx-2">Qué hacer en</h2>
      <span className="text-lg font-bold text-gray-500 text-shadow-medium opacity-23">{busDetails.destino.toUpperCase()}</span>
      <hr className="border-gray-500 flex-grow opacity-20" />
    </div>
  
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-h-96 overflow-y-auto">
      {busDetails.touristPoints.map((point, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
          style={{ width: '100%', height: '150px' }}
        >
          <div
            className="text-base text-black font-bold cursor-pointer flex flex-col items-center justify-center h-full text-center"
            onClick={() => handleStarClick(point.name)}
          >
            <span>
              {selectedPoints.includes(point.name) ? '⭐' : '☆'} {point.name}
            </span>
            <p className='bg-blue-950 text-white rounded-lg'>${point.price}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
  
  
  );
};

export default TouristPointsSection;
