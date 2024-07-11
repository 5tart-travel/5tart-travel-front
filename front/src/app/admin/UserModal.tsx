'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ToggleUser from './ToggleUser';

interface Users {
  id?: string;
  username: string;
  mail: string;
  password?: string;
  birthday: string;
  isActive?: boolean;
  favorite_tours?: [];
  avatar?: string;
}

interface UserModalProps {
  users: Users[];
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ users, onClose }) => {
  const [userList, setUserList] = useState(users);
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

  const handleToggleUser = (userId: string, newStatus: boolean) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive: newStatus } : user
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
            Detalles de Usuarios
          </h2>
          <ul className="space-y-4">
            {Array.isArray(userList) ? (
              userList.map((user) => (
                <div key={user.id} className={`flex items-center justify-between p-4 rounded-lg shadow-xl hover:shadow-2xl bg-white`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gray-400 rounded-full overflow-hidden ${user.isActive ? '' : 'grayscale'}`}>
                      <Image
                        src={user.avatar || 'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/yglvytp7lyjwt2lkygba.webp'}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        width={48} // Adjust width and height as per your design
                        height={48}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                      <p className="text-sm text-gray-600">{user.mail}</p>
                      <p className="text-sm text-gray-600">{new Date(user.birthday).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <ToggleUser
                    userId={user.id!}
                    isActive={user.isActive!}
                    onToggle={handleToggleUser}
                  />
                </div>
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
