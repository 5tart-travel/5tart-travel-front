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

const TouristPointsSection: React.FC<TouristPointsSectionProps> = ({ touristPoints, selectedPoints, setSelectedPoints }) => {

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
    <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
      {touristPoints.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
        }}>
          {touristPoints.map((point, index) => (
            <div key={index} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}>
              <input
                type='checkbox'
                checked={selectedPoints.some(selectedPoint => selectedPoint.name === point.name)}
                onChange={() => togglePointSelection(point.name)}
                style={{ marginBottom: '5px' }}
              />
              <p style={{ margin: '0', textAlign: 'center', fontSize: '0.9em', fontWeight: 'bold', minHeight: '40px' }}>{point.name}</p>
              <div style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', padding: '5px' }}>
                <p style={{ margin: '0', fontSize: '0.8em' }}>${point.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '10px' }}>No hay Actividades disponibles para este destino.</p>
      )}
    </div>
  );
};

export default TouristPointsSection;
