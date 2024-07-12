'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { TbBrandGoogleHome } from "react-icons/tb";
import AgencyModal from './AgencyModal';

interface Agency {
  id: string;
  name_agency: string;
  mail: string;
  address: string;
  isActive: boolean;
  imgUrl?: string;
}

const CardAgency: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/agency');
        console.log('Fetched agencies:', response.data);
        setAgencies(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  return (
    <div
      className="relative p-4 bg-white hover:bg-slate-50 rounded-2xl shadow-xl cursor-pointer text-white w-60 h-[110px] hover:shadow-2xl transition-shadow"
      onClick={openModal}
    >
      <div className="absolute top-2 left-2 bg-white rounded-full p-2">
        <TbBrandGoogleHome className="text-lime-700" size={24} />
      </div>
      <div className="absolute bottom-2 right-2">
        <TbBrandGoogleHome className="text-orange-500" size={24} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-5xl text-gray-600 text-shadow-medium font-bold">{agencies.length}</p>
        <p className="text-xl text-shadow-medium text-gray-600 font-semibold">Agencias</p>
      </div>
      {isModalOpen && (
        <AgencyModal agencies={agencies} onClose={closeModal} />
      )}
    </div>
  );
};

export default CardAgency;
