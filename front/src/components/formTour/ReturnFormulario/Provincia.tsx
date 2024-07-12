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
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="mb-4 mr-9">
      <label
        htmlFor="provincia"
        className="block text-sm font-medium text-gray-700"
      >
        Provincia de destino
      </label>

      <div className="flex flex-col relative">
        <input
          id="provincia"
          type="text"
          value={destino}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={showDropdown}
          onBlur={hideDropdown}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {showRequirements && filteredProvincias.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1"
          >
            {filteredProvincias.map((provincia, index) => (
              <div
                key={provincia}
                onClick={() => handleSuggestionClick(provincia)}
                className={`cursor-pointer px-3 py-2 hover:bg-gray-200 ${
                  selectedIdx === index ? 'bg-gray-200' : ''
                }`}
              >
                {provincia}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Provincia;
