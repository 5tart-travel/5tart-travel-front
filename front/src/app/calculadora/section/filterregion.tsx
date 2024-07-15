import React from 'react';

interface RegionFilterProps {
  selectedRegion: string | null;
  regions: string[];
  handleSelectRegion: (region: string | null) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, regions, handleSelectRegion }) => {
  return (
    <div className="mt-10" style={{ flex: '1', maxWidth: '50%', overflowY: 'auto' }}>
      <div style={{ border: '2px solid #172554', borderRadius: '8px', padding: '10px', maxHeight: '70vh' }}>
        <h2 className="text-center" style={{ marginBottom: '10px' }}>Filtrar por Región</h2>
        <hr className='mt-1 mb-10' />

        <div style={{ marginTop:'4px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
          {regions.map(region => (
            <button
              key={region}
              onClick={() => handleSelectRegion(region)}
              style={{
                gridColumn: 'span 1',
                backgroundColor: selectedRegion === region ? '#172554' : 'white',
                color: selectedRegion === region ? 'white' : '#172554',
                border: '1px solid #172554',
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