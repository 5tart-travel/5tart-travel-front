import React from 'react';

interface TipoTransporteProps {
  transportType: string;
  setTransportType: React.Dispatch<React.SetStateAction<string>>;
}

const TipoTransporte: React.FC<TipoTransporteProps> = ({
  transportType,
  setTransportType,
}) => {
  return (
    <div className="mb-4 mr-9">
      <label
        htmlFor="transportType"
        className="block text-sm font-medium text-gray-700"
      >
        Tipo de Transporte
      </label>
      <select
        id="transportType"
        value={transportType}
        onChange={(e) => setTransportType(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Seleccione una opción</option>
        <option value="plane">Aéreo</option>
        <option value="bus">Terrestre</option>
      </select>
    </div>
  );
};

export default TipoTransporte;
