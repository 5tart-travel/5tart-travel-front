import { useRef, useState } from 'react';

interface ITourFormProps {
  hotel: string;
  setHotel: React.Dispatch<React.SetStateAction<string>>;
}

const Hotel: React.FC<ITourFormProps> = ({ hotel, setHotel }) => {
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
        htmlFor="hotel"
        className="block text-sm font-medium text-gray-700"
      >
        Nombre del hotel
      </label>

      <div className="flex">
        <input
          id="hotel"
          placeholder="Mínimo 5 caracteres"
          type="text"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
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
                Este campo es obligatorio.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
