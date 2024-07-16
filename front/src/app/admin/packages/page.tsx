'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBus, FaHotel, FaShieldAlt } from 'react-icons/fa';
import Image from 'next/image';

interface Package {
  id: string;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
  fecha_ingreso: string;
  fecha_egreso: string;
  destino: string;
  salida: string;
  hotel: string;
  averageRate: number;
  oferta: boolean;
  agency: {
    name_agency: string;
    imgUrl: string;
  };
}

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/tours');
        if (Array.isArray(response.data)) {
          const activePackages = response.data.filter((pkg: Package) => pkg.oferta === true);
          setPackages(activePackages);
        } else {
          console.error('Unexpected response format:', response.data);
          setPackages([]);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setPackages([]);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center min-h-screen p-6">
        <div className="flex flex-col space-y-4 w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border rounded"
          />
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/3 h-48 md:h-auto">
                <Image
                  src={pkg.imgUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-full md:w-2/3 p-4 flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-2/3 pr-4">
                  <h2 className="text-2xl font-semibold mb-2">{pkg.title}</h2>
                  <p className="text-gray-700 mb-1 truncate">
                    <strong>Destinos:</strong> {pkg.destino}
                  </p>
                  <p className="text-gray-700 mb-1 truncate">
                    <strong>Saliendo desde:</strong> {pkg.salida}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Fechas de salida:</strong>{' '}
                    {new Date(pkg.fecha_ingreso).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Hotel:</strong> {pkg.hotel}{' '}
                    <span className="text-green-500 font-bold">{pkg.averageRate}</span>
                  </p>
                  <p className="text-gray-700 mb-1 truncate">
                    <strong>Descripción:</strong> {pkg.description}
                  </p>
                  <div className="flex items-center justify-start space-x-4 mt-4">
                    <div className="flex items-center bg-gray-400 rounded-2xl px-2 py-1 text-gray-500 font-semibold">
                      <FaBus className="text-gray-500 mr-1" size={16} />
                      <span>Bus</span>
                    </div>
                    <div className="flex items-center bg-gray-400 rounded-2xl px-2 py-1 text-gray-500 font-semibold">
                      <FaHotel className="text-gray-500 mr-1" size={16} />
                      <span>Hotel</span>
                    </div>
                    <div className="flex items-center bg-gray-400 rounded-2xl px-2 py-1 text-gray-500 font-semibold">
                      <FaShieldAlt className="text-gray-500 mr-1" size={16} />
                      <span>Seguro</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:block">
                  <div className="h-full w-[2px] bg-gray-400"></div>
                </div>
                <div className="w-full md:w-1/3 my-6 flex flex-col items-center pl-4">
                  <div className="flex flex-col items-end">
                    <span className="text-gray-700 font-semibold">{pkg.agency.name_agency}</span>
                    <Image
                      src={pkg.agency.imgUrl}
                      alt={pkg.agency.name_agency}
                      width={150}
                      height={150}
                      className="rounded-2xl my-4"
                    />
                    <p className="text-2xl font-bold text-gray-600">${pkg.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
