'use client'
import React, { useEffect, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface Users {
  id?: string;
  username: string;
  mail: string;
  password?: string;
  birthday: string;
  favorite_tours?: [];
}

interface UserModalProps {
  users: Users[];
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ users, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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

  const isArray = Array.isArray(users);

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-20 pt-20">
      <div
        ref={modalRef}
        className=" bg-white mt-16 p-4 rounded-lg shadow-sm relative w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-8 text-black bg-transparent rounded-full p-1 focus:outline-none"
        >
          <AiOutlineCloseCircle className="w-9 h-9 text-gray-500 hover:text-gray-600" />
        </button>
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Detalles de Notificaciones
          </h2>
          <ul className="space-y-2">
            {isArray ? (
              users.map((users, index) => (
                <li key={index} className="border-b pb-2">
                  <p>
                    <strong>Nombre:</strong> {users.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {users.mail}
                  </p>
                 
                 
                </li>
              ))
            ) : (
              <p>No se encontraron usuarios.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
