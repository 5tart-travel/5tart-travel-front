'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import TogglePack from '../TogglePack';
import Image from 'next/image';
import { FaBus, FaHotel, FaShieldAlt } from 'react-icons/fa';
import WrappedSearchBarComponent from '../users/SearchBarUser';

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
  } | null;
}

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPackages = async () => {
    try {
      const response = await axios.get(
        'https://fivetart-travel-kafg.onrender.com/tours',
      );
      if (Array.isArray(response.data)) {
        setPackages(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setPackages([]);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDeletePackage = async (packageId: string) => {
    try {
      const token = localStorage.getItem('userSession');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tours/${packageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        //? Elimino el paquete del estado local

        setPackages((prevPackages) =>
          prevPackages.filter((pkg) => pkg.id !== packageId),
        );
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Paquete eliminado exitosamente',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        throw new Error('No se pudo eliminar el paquete');
      }
    } catch (error) {
      console.error(`Error eliminando el paquete con ID ${packageId}:`, error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al eliminar el paquete',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-4">
      <WrappedSearchBarComponent onSearch={setSearchQuery} />
      <div className="flex justify-center min-h-screen p-6">
        <div className="flex flex-col space-y-4 w-full max-w-4xl">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row relative"
            >
              <div className="absolute top-4 left-4">
                <TogglePack packageId={pkg.id} onDelete={handleDeletePackage} />
              </div>
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
                    <span className="text-green-500 font-bold">
                      {pkg.averageRate}
                    </span>
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
                  {pkg.agency ? (
                    <div className="flex flex-col items-end">
                      <span className="text-gray-700 font-semibold">
                        {pkg.agency.name_agency}
                      </span>
                      <Image
                        src={pkg.agency.imgUrl}
                        alt={pkg.agency.name_agency}
                        width={150}
                        height={150}
                        className="rounded-2xl my-4"
                      />
                      <p className="text-2xl font-bold text-gray-600">
                        ${pkg.price}
                      </p>
                    </div>
                  ) : (
                    <div className="text-red-500">Agencia no disponible</div>
                  )}
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
