import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Tour {
  state: string;
  oferta: boolean;
}

const Offer = () => {
  const [oferta, setOferta] = useState<string[]>([]);
  const router = useRouter();

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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Oferta</h2>
        <label className="inline-flex items-center cursor-pointer mr-5">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default Offer;
