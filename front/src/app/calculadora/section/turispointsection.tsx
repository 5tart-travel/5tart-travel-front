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
    <div className='mt-20'>
      <hr className='mt-20px'/>
      <h2 style={{ marginBottom: '10px', textAlign: 'center', marginTop: '20px' }}>Tours Disponibles</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px'
      }}>
        {touristPoints.length > 0 ? (
          touristPoints.map((point, index) => (
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
              <label style={{ marginBottom: '5px' }}>{point.name}</label>
              <p>Precio por persona: ${point.price}</p>
            </div>
          ))
        ) : (
          <p>No se han seleccionado puntos turísticos.</p>
        )}
      </div>
    </div>
  );
};

export default TouristPointsSection;
