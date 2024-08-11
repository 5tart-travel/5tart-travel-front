import React from 'react';

interface RegionFilterProps {
  selectedRegion: string | null;
  regions: string[];
  handleSelectRegion: (region: string | null) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, regions, handleSelectRegion }) => {
  return (
    <div className="mt-10 flex-1 max-w-[50%] overflow-y-auto bg-white rounded-xl shadow-2xl ">
      <div className="border-2 border-[#172554] rounded-xl p-2.5 max-h-[70vh]">
        <h2 className="text-center text-gray-600 text-xl text-shadow-semilight font-bold leading-relaxed flex items-center justify-center gap-2">Filtrar por Región</h2>
        <hr className="mt-1 mb-10" />
  
        <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2.5">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleSelectRegion(region)}
              className={`col-span-1 border bg-orange-400 rounded-xl p-2 cursor-pointer ${
                selectedRegion === region
                  ? 'bg-[#172554] text-white'
                  : 'bg-violet-200 hover:bg-violet-300 text-[#172554]'
              }`}
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