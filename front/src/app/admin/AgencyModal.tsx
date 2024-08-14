/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 600);
  };

  const handleToggleAgency = (agencyId: string, newStatus: boolean) => {
    setAgencyList((prevAgencies) =>
      prevAgencies.map((agency) =>
        agency.id === agencyId ? { ...agency, isActive: newStatus } : agency,
      ),
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-20 pt-20">
      <div
        ref={modalRef}
        className={`bg-gray-100 mt-16 p-6 rounded-2xl shadow-xl relative w-11/12 md:w-2/3 lg:w-3/5 max-h-3/4 transition-all duration-500 ${
          closing ? 'transform scale-y-0 scale-x-50 opacity-0' : ''
        }`}
      >
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl text-center text-shadow-medium font-bold text-gray-700 text-shadow-light mb-4">
            Detalles de Agencias
          </h2>
          <ul className="space-y-4">
            {Array.isArray(agencyList) ? (
              agencyList.map((agency) => (
                <div
                  key={agency.id}
                  className={`flex items-center justify-between p-4 rounded-lg shadow-xl hover:shadow-2xl bg-white cursor-pointer`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gray-400 rounded-full overflow-hidden flex-shrink-0 ${
                        agency.isActive ? '' : 'grayscale'
                      }`}
                    >
                      {agency.imgUrl ? (
                        <Image
                          src={agency.imgUrl}
                          alt="Avatar"
                          className="object-cover w-full h-full"
                          width={500}
                          height={500}
                        />
                      ) : (
                        <TbBrandGoogleHome className="w-full h-full text-gray-500" />
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                          Nombre
                        </h3>
                        <div className="relative group">
                          <p className="text-sm font-semibold text-gray-600 truncate w-[90px]">
                            {agency.name_agency}
                          </p>
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
                            {agency.name_agency}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                          Email
                        </h3>
                        <div className="relative group">
                          <p className="text-sm font-semibold text-gray-600 truncate w-[120px]">
                            {agency.mail}
                          </p>
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
                            {agency.mail}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                          Dirección
                        </h3>
                        <p className="text-sm text-gray-600 font-semibold">
                          {agency.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ToggleAgency
                    agencyId={agency.id!}
                    isActive={agency.isActive!}
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
