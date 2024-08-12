import React from 'react';

interface TouristPoint {
  name: string;
  price: number;
}

interface TouristPointsSectionProps {
  touristPoints: TouristPoint[];
  selectedPoints: TouristPoint[];
  setSelectedPoints: React.Dispatch<React.SetStateAction<TouristPoint[]>>;
}

export const TouristPointsSection: React.FC<TouristPointsSectionProps> = ({ touristPoints, selectedPoints, setSelectedPoints }) => {

  const togglePointSelection = (pointName: string) => {
    const isSelected = selectedPoints.some(point => point.name === pointName);

    if (isSelected) {
      setSelectedPoints(prevPoints => prevPoints.filter(point => point.name !== pointName));
    } else {
      const pointToAdd = touristPoints.find(point => point.name === pointName);
      if (pointToAdd) {
        setSelectedPoints(prevPoints => [...prevPoints, pointToAdd]);
      }
    }
  };

  return (
    <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
    {touristPoints.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {touristPoints.map((point, index) => (
          <div 
            key={index} 
            className="border border-blue-950 rounded-xl p-3 flex flex-col items-center bg-violet-100 shadow-2xl cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedPoints.some(selectedPoint => selectedPoint.name === point.name)}
              onChange={() => togglePointSelection(point.name)}
              className="mb-2"
            />
            <p className="m-0 text-center text-xs font-bold min-h-[40px]">
              {point.name}
            </p>
            <div className="bg-blue-950 text-white rounded-lg p-2 mt-2">
              <p className="m-0 text-[0.7rem]">
                ${point.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-lime500 text-xl text-shadow-semilight font-bold leading-relaxed flex items-center justify-center gap-2 mt-[120px]">
        No hay Actividades disponibles para este destino.
      </p>
    )}
  </div>
  
  );
};

export default TouristPointsSection;
