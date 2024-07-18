import { useRef, useState, useEffect, KeyboardEvent } from 'react';

interface ITourFormProps {
  destino: string;
  setDestino: React.Dispatch<React.SetStateAction<string>>;
}

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const provincias = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
];

const Provincia: React.FC<ITourFormProps> = ({ destino, setDestino }) => {
  const [showRequirements, setShowRequirements] = useState(false);
  const [filteredProvincias, setFilteredProvincias] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowRequirements(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showDropdown = () => {
    setShowRequirements(true);
  };

  const hideDropdown = () => {
    setShowRequirements(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestino(value);

    if (value) {
      const normalizedInput = removeAccents(value.toLowerCase());
      const filtered = provincias.filter((provincia) =>
        removeAccents(provincia.toLowerCase()).includes(normalizedInput),
      );
      setFilteredProvincias(filtered);
    } else {
      setFilteredProvincias([]);
    }

    setSelectedIdx(-1);
  };

  const handleSuggestionClick = (provincia: string) => {
    setDestino(provincia);
    setFilteredProvincias([]);
    setSelectedIdx(-1);
    setShowRequirements(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredProvincias.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx > 0 ? prevIdx - 1 : filteredProvincias.length - 1,
        );
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx < filteredProvincias.length - 1 ? prevIdx + 1 : 0,
        );
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        if (selectedIdx !== -1) {
          e.preventDefault();
          setDestino(filteredProvincias[selectedIdx]);
          setFilteredProvincias([]);
          setSelectedIdx(-1);
          setShowRequirements(false);
        }
      }
    }
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-4">
      <label
        htmlFor="provincia"
        className="block text-sm font-medium text-gray-700"
      >
        Provincia de destino
      </label>

      <div className="flex ">
        <input
          id="provincia"
          type="text"
          value={destino}
          placeholder="Minimo 4 caracteres"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={showDropdown}
          onBlur={hideDropdown}
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
        {showRequirements && (
          <div className="relative" ref={dropdownRef}>
            <div
              id="dropdownDelay"
              className="absolute left-full top-[-10px] z-10 ml-2 w-48 rounded-lg shadow-xl border-t-4 border-lime-500 bg-white block"
            >
              <div className="py-2 px-4 bg-yellow-100 rounded-tr-xl rounded-br-xl rounded-bl-lg">
                <p className="text-gray-700 text-sm">
                  La cantidad de caracteres debe ser de mínimo 4 y máximo 30
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Provincia;
