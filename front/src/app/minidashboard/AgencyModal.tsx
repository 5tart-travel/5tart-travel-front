'use client'
import React, { useEffect, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface Agency {
  id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  email: string;
}

interface AgencyModalProps {
  agencies: Agency[];
  onClose: () => void;
}

const AgencyModal: React.FC<AgencyModalProps> = ({ agencies, onClose }) => {
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

  const isArray = Array.isArray(agencies);

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-50 pt-20">
      <div ref={modalRef} className="backdrop-filter backdrop-blur bg-opacity-70 bg-white mt-16 p-4 rounded-lg shadow-sm relative w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4">
        <button
          onClick={onClose}
          className="absolute top-2 right-8 text-black bg-transparent rounded-full p-1 focus:outline-none"
        >
          <AiOutlineCloseCircle className="w-9 h-9 text-gray-500 hover:text-gray-600" />
        </button>
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de Agencias</h2>
          <ul className="space-y-2">
            {isArray ? (
              agencies.map((agency, index) => (
                <li key={index} className="border-b pb-2">
                  <p><strong>Nombre:</strong> {agency.name}</p>
                  <p><strong>Descripción:</strong> {agency.description}</p>
                  <p><strong>Ubicación:</strong> {agency.location}</p>
                  <p><strong>Teléfono:</strong> {agency.phone}</p>
                  <p><strong>Email:</strong> {agency.email}</p>
                </li>
              ))
            ) : (
              <p>No agencies available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgencyModal;
