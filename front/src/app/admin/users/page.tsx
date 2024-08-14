'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ToggleUser from '../ToggleUser';
import SearchBarComponent from './SearchBarUser'; // Asegúrate de usar el nombre correcto

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
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/user', {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleToggleUser(userId: string, newStatus: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="p-4">
      <div className="mb-4 w-[400px] flex intem-center justify-center bg-violet-300 rounded-xl shadow-2xl" >
      <SearchBarComponent onSearch={setSearchQuery} />   
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            className="bg-violet-100 rounded-lg shadow-md p-4 transform transition-all hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`relative w-12 h-12 bg-violet-400 rounded-full overflow-hidden border-8 border-gray-700 ${user.isActive ? '' : 'grayscale'}`}>
                <Image
                  src={user.avatar || 'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/perfil_pbtlkc'}
                  alt="Avatar"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-x-8 text-center">
                <div>
                  <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                    Nombre
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 truncate w-[100px]">
                    {user.username}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                    Email
                  </h3>
                  <div className="relative group">
                    <p className="text-sm font-semibold text-gray-600 truncate w-[120px] cursor-pointer">
                      {user.mail}
                    </p>
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
                      {user.mail}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-shadow-medium text-violet-600">
                    Fecha de Nac.
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    {new Date(user.birthday).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end ml-auto">
                <p className={`text-sm font-medium ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
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
