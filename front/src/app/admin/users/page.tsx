'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ToggleUser from '../ToggleUser';
import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBarUsers';

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
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

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

  const handleToggleUser = (userId: string, newStatus: boolean) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isActive: newStatus } : user
      )
    );
  };

  return (
    <div className="p-4">
      <SearchBar />
      {filteredUsers.map(user => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow-md p-4 mb-4 transform transition-all hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gray-400 rounded-full overflow-hidden ${user.isActive ? '' : 'grayscale'}`}>
              <Image
                src={user.avatar || 'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/yglvytp7lyjwt2lkygba.webp'}
                alt="Avatar"
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{user.username}</h3>
              <p className="text-gray-600">{user.mail}</p>
              <p className="text-gray-600">{new Date(user.birthday).toLocaleDateString()}</p>
              <p className={`text-sm font-medium ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <ToggleUser
              userId={user.id!}
              isActive={user.isActive!}
              onToggle={handleToggleUser}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;

