import React, { useState } from 'react';

interface NombreEmpresaTransProps {
  empresa: string;
  setEmpresa: React.Dispatch<React.SetStateAction<string>>;
  transportType: string;
}

const EmpresaPlane = [
  'Turkish Airlines',
  'LATAM Airlines',
  'Jetsmart',
  'Iberia',
  'Avianca',
  'Flybondi',
  'Aerolineas Argentinas',
  'American Airlines',
  'Air Canada',
];

const EmpresaBus = [
  'Andesmar',
  'Via Bariloche',
  'Iryo',
  'Plusmar',
  'Colonia Express',
  'Flixbus',
  'CATA Internacional',
  'BlaBlaCar',
  'Alsa',
];

const NombreEmpresaTrans: React.FC<NombreEmpresaTransProps> = ({
  empresa,
  setEmpresa,
  transportType,
}) => {
  const [showRequirements, setShowRequirements] = useState(false);

  const showDropdown = () => {
    setShowRequirements(true);
  };

  const hideDropdown = () => {
    setShowRequirements(false);
  };

  const getOptions = () => {
    if (transportType === 'plane') {
      return EmpresaPlane;
    }
    if (transportType === 'bus') {
      return EmpresaBus;
    }
    return [];
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="empresa"
        className="block text-sm font-medium text-gray-700"
      >
        Nombre empresa trans
      </label>

      <div className="flex">
        <select
          id="empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Seleccione una empresa
          </option>
          {getOptions().map((empresa) => (
            <option key={empresa} value={empresa}>
              {empresa}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NombreEmpresaTrans;
