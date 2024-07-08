import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Tour {
  state: string;
  oferta: boolean;
}

const Price = () => {
  const [orden, setOrden] = useState<string>('');
  const router = useRouter();

  const handleOptionChange = (option: string) => {
    setOrden(option);
  };

  useEffect(() => {
    fetch('https://fivetart-travel-kafg.onrender.com/tours')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching tours:', error);
      });
  }, []);

  return (
    <div className="p-4 bg-white rounded-md mt-5">
      <h2 className="text-lg font-semibold mb-2">Ordene por:</h2>
      <div className="flex flex-col">
        <div className="mb-2">
          <input
            id="menorPrecio"
            type="radio"
            name="ordenPrecio"
            className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            checked={orden === 'menor'}
            onChange={() => handleOptionChange('menor')}
          />
          <label
            htmlFor="menorPrecio"
            className="text-sm font-medium text-gray-700"
          >
            Menor precio
          </label>
        </div>
        <div>
          <input
            id="mayorPrecio"
            type="radio"
            name="ordenPrecio"
            className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            checked={orden === 'mayor'}
            onChange={() => handleOptionChange('mayor')}
          />
          <label
            htmlFor="mayorPrecio"
            className="text-sm font-medium text-gray-700"
          >
            Mayor precio
          </label>
        </div>
      </div>
    </div>
  );
};

export default Price;
