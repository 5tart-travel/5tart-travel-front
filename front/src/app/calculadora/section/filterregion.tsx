import React from 'react';

interface RegionFilterProps {
  selectedRegion: string | null;
  regions: string[];
  handleSelectRegion: (region: string | null) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, regions, handleSelectRegion }) => {
  return (
    <div className="mt-10" style={{ flex: '1', maxWidth: '50%' }}>
      <div style={{ border: '2px solid #007BFF', borderRadius: '8px', padding: '10px', maxHeight: '70vh', overflowY: 'auto' }}>
        <h2 className="text-center" style={{ marginBottom: '10px' }}>Filtrar por Región</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleSelectRegion(null)}
            style={{
              backgroundColor: selectedRegion === null ? '#007BFF' : 'white',
              color: selectedRegion === null ? 'white' : '#007BFF',
              border: '1px solid #007BFF',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            Todos
          </button>
          {regions.map(region => (
            <button
              key={region}
              onClick={() => handleSelectRegion(region)}
              style={{
                backgroundColor: selectedRegion === region ? '#007BFF' : 'white',
                color: selectedRegion === region ? 'white' : '#007BFF',
                border: '1px solid #007BFF',
                borderRadius: '4px',
                padding: '8px',
                cursor: 'pointer'
              }}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionFilter;
