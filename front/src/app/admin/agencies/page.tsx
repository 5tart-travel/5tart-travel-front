'use client';

import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { TbBrandGoogleHome } from 'react-icons/tb';
import { useSearchParams } from 'next/navigation';
import SearchBarAgencies from './SearchBarAgencies';
import ToggleAgency from '../ToggleAgency';
import WrappedSearchBarComponent from '../users/SearchBarUser';

interface Agency {
  id?: string;
  name_agency?: string;
  mail?: string;
  address?: string;
  isActive?: boolean;
  imgUrl?: string;
}

const Agencies: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const searchParams = useSearchParams();
  // const searchQuery = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get(
          'https://fivetart-travel-kafg.onrender.com/agency',
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN_HERE`,
            },
          },
        );
        setAgencies(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const filteredAgencies = agencies.filter((agency) =>
    (agency.name_agency || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleToggleAgency = (agencyId: string, newStatus: boolean) => {
    setAgencies((prevAgencies) =>
      prevAgencies.map((agency) =>
        agency.id === agencyId ? { ...agency, isActive: newStatus } : agency,
      ),
    );
  };

  return (
    <div className="p-4">
      <WrappedSearchBarComponent onSearch={setSearchQuery} />

      <div className="grid grid-cols-1 gap-4">
        {filteredAgencies.map((agency) => (
          <div
            key={agency.id}
            className="relative bg-violet-100 rounded-lg shadow-md p-4 transform transition-all hover:scale-105 translate-x-4 hover:shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`relative w-12 h-12 bg-violet-400 rounded-full overflow-hidden border-8 border-gray-700 ${agency.isActive ? '' : 'grayscale'
                  }`}
              >
                {agency.imgUrl ? (
                  <Image
                    src={agency.imgUrl}
                    alt="Avatar"
                    fill
                    objectFit="cover"
                    className="object-cover rounded-full"
                  />
                ) : (
                  <TbBrandGoogleHome className="w-full h-full text-gray-500" />
                )}
              </div>
              <div className="grid grid-cols-4 gap-x-4 w-full text-left">
                <div>
                  <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                    Nombre
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 truncate w-[200px]">
                    {agency.name_agency || 'Sin nombre'}
                  </p>
                </div>
                <div className="mx-4"> {/* Aplica el mismo margen horizontal aquí */}
                  <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                    Email
                  </h3>
                  <div className="relative group">
                    <p className="text-sm font-semibold text-gray-600 cursor-pointer">
                      {agency.mail || 'Sin email'}
                    </p>
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
                      {agency.mail || 'Sin email'}
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                    Dirección
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    {agency.address || 'Sin dirección'}
                  </p>
                </div>
              </div>

            </div>
            <div className="absolute top-4 right-4 flex flex-col items-end">
              <p
                className={`text-sm font-medium ${agency.isActive ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                {agency.isActive ? 'Activo' : 'Desactivado'}
              </p>
              <ToggleAgency
                agencyId={agency.id!}
                isActive={agency.isActive!}
                onToggle={handleToggleAgency}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AgenciesPageWrapper: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Agencies />
    </Suspense>
  );
};

export default AgenciesPageWrapper;
