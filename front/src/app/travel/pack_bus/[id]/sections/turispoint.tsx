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
    <section>
      <h2 className="text-2xl font-bold text-center mt-10 mb-5">Selecciona tu actividad favorita</h2>
      <div className="flex items-center mb-1 mt-10">
        <hr className="border-gray-300 flex-grow opacity-20" />
        <h2 className="text-lg font-bold text-gray-300 mx-2">Qué hacer en</h2>
        <span className="text-lg font-bold text-gray-300 opacity-23">{busDetails.destino.toUpperCase()}</span>
        <hr className="border-gray-300 flex-grow opacity-20" />
      </div>

      <div className="mt-4 ml-10 grid grid-cols-8 gap-2 max-h-96 overflow-y-auto">
        {busDetails.touristPoints.map((point, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
            style={{ width: '150px', height: '150px' }}
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
