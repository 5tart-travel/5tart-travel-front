import { useRef, useState } from 'react';

interface ITourFormProps {
  salida: string;
  setSalida: React.Dispatch<React.SetStateAction<string>>;
}

const AeropuertoTerminal: React.FC<ITourFormProps> = ({
  salida,
  setSalida,
}) => {
  const [showRequirements, setShowRequirements] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const showDropdown = () => {
    setShowRequirements(true);
  };

  const hideDropdown = () => {
    setShowRequirements(false);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="salida"
        className="block text-sm font-medium text-gray-700"
      >
        Nombre del aeropuerto o terminal de salida
      </label>

      <div className="flex">
        <input
          id="salida"
          type="text"
          value={salida}
          onChange={(e) => setSalida(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <div
          className="flex items-center px-3 cursor-pointer"
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
        >
          <svg
            className="h-3 w-3 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {' '}
            <circle cx="12" cy="12" r="10" />{' '}
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />{' '}
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      </div>
      {showRequirements && (
        <div className="relative" ref={dropdownRef}>
          <div
            id="dropdownDelay"
            className="absolute left-full top-[-10px] z-10 ml-2 w-48 rounded-lg shadow-xl border-t-4 border-lime-500 bg-white block"
          >
            <div className="py-2 px-4 bg-yellow-100 rounded-tr-xl rounded-br-xl rounded-bl-lg">
              <p className="text-gray-700 text-sm">
                La cantidad de caracteres debe ser de mínimo 5 y máximo 30
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AeropuertoTerminal;

{
  /* <label
        htmlFor="salida"
        className="block text-sm font-medium text-gray-700"
      >
        Nombre del aeropuerto o terminal de salida
      </label>
      <input
        id="salida"
        type="text"
        value={salida}
        onChange={(e) => setSalida(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      /> */
}
