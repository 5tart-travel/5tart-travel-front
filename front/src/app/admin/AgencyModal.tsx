'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ToggleAgency from './ToggleAgency';
import { TbBrandGoogleHome } from 'react-icons/tb';
import Image from 'next/image';

interface Agency {
  id: string;
  name_agency: string;
  mail: string;
  address: string;
  isActive: boolean;
  imgUrl?: string;
}

interface AgencyModalProps {
  agencies: Agency[];
  onClose: () => void;
}

const AgencyModal: React.FC<AgencyModalProps> = ({ agencies, onClose }) => {
  const [agencyList, setAgencyList] = useState(agencies);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleToggleAgency = (agencyId: string, newStatus: boolean) => {
    setAgencyList((prevAgencies) =>
      prevAgencies.map((agency) =>
        agency.id === agencyId ? { ...agency, isActive: newStatus } : agency
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-20 pt-20">
      <div
        ref={modalRef}
        className="bg-gray-100 mt-16 p-6 rounded-2xl shadow-xl relative w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4 "
      >
       
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-bold text-gray-700 text-shadow-light mb-4">
            Detalles de Agencias
          </h2>
          <ul className="space-y-4">
            {Array.isArray(agencyList) ? (
              agencyList.map((agency) => (
                <div key={agency.id} className={`flex items-center justify-between p-4 rounded-lg shadow-xl hover:shadow-2xl bg-white`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gray-400 rounded-full overflow-hidden ${agency.isActive ? '' : 'grayscale'}`}>
                      {agency.imgUrl ? (
                        <Image
                          src={agency.imgUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      ) : (
                        <TbBrandGoogleHome className="w-full h-full text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{agency.name_agency}</p>
                      <p className="text-sm text-gray-600">{agency.mail}</p>
                      <p className="text-sm text-gray-600">{agency.address}</p>
                    </div>
                  </div>
                  <ToggleAgency
                    agencyId={agency.id}
                    isActive={agency.isActive}
                    onToggle={handleToggleAgency}
                  />
                </div>
              ))
            ) : (
              <p>No se encontraron agencias.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgencyModal;
