import React from 'react';
import { IBusTour } from '@/interface/IBusTour';

interface TouristPointsSectionProps {
  busDetails: IBusTour;
}

const TouristPointsSection: React.FC<TouristPointsSectionProps> = ({ busDetails }) => {
  if (!busDetails.touristPoints || busDetails.touristPoints.length === 0) {
    return null; // No renderizar nada si no hay puntos turísticos
  }

  return (
    <section>
      <div className="flex items-center mb-1 mt-10">
        <hr className="border-gray-300 flex-grow opacity-20" />
        <h2 className="text-lg font-bold text-gray-300 mx-2">Qué hacer en </h2>
        <span className="text-lg font-bold text-gray-300 opacity-23">{busDetails.destino.toUpperCase()}</span>
        <hr className="border-gray-300 flex-grow opacity-20" />
      </div>

      <div className="mt-4 ml-10 grid grid-cols-3 gap-4">
        {busDetails.touristPoints.map((point, index) => (
          <div key={index} className="text-base text-gray-500">
            ⭐ {point.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TouristPointsSection;
