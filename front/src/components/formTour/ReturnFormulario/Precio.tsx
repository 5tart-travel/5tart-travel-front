import React from 'react';

interface ITourFormProps {
  price: number | null;
  setPrice: React.Dispatch<React.SetStateAction<number | null>>;
}

const Precio: React.FC<ITourFormProps> = ({ price, setPrice }) => {
  const formatPrice = (value: number | null) => {
    if (value === null) return '';
    return value.toLocaleString('es-ES');
  };

  return (
    <div className="mb-4 mr-9">
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Precio
      </label>
      <input
        id="price"
        type="text"
        value={formatPrice(price)}
        onChange={(e) => {
          const inputValue = e.target.value.replace(/\./g, '');
          setPrice(inputValue ? parseFloat(inputValue) : null);
        }}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default Precio;
