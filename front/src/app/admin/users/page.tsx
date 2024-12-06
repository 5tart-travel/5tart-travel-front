'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ToggleUser from '../ToggleUser';
import SearchBarComponent from './SearchBarUser';
import WrappedSearchBarComponent from './SearchBarUser';
import Swal from 'sweetalert2';

interface Users {
  id?: string;
  username: string;
  mail: string;
  birthday: string;
  isActive?: boolean;
  avatar?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN_HERE`,
            },
          },
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleToggleUser = async (userId: string, newStatus: boolean) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: newStatus } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar el estado del usuario',
      });
    }
  };

  return (
    <div className="p-4">
      <WrappedSearchBarComponent onSearch={setSearchQuery} />

      <div className="w-full max-w-4xl mx-auto space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 transform transition-all hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-start gap-8">
              <div
                className={`relative w-12 h-12 bg-gray-400 rounded-full overflow-hidden ${
                  user.isActive ? '' : 'grayscale'
                }`}
              >
                <Image
                  src={
                    user.avatar ||
                    'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/perfil_pbtlkc'
                  }
                  alt="Avatar"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                <div>
                  <h3 className="text-base font-bold text-gray-700 text-shadow-medium">Nombre</h3>
                  <p className="text-sm font-semibold text-gray-600 truncate">
                    {user.username}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 text-shadow-medium ">Email</h3>
                  <div className="relative group">
                    <p className="text-sm font-semibold text-gray-600 truncate cursor-pointer">
                      {user.mail}
                    </p>
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
                      {user.mail}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-700 text-shadow-medium">
                    Fecha de Nac.
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    {new Date(user.birthday).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p
                  className={`text-sm font-medium ${
                    user.isActive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {user.isActive ? 'Activo' : 'Desactivado'}
                </p>
                <ToggleUser
                  userId={user.id!}
                  isActive={user.isActive!}
                  onToggle={handleToggleUser}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
