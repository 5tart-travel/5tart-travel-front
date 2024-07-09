'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import { PiUsersThreeBold } from "react-icons/pi";
import { checkUserRole } from '@/utils/decodeJwt'; 

interface Users {
  id?: string;
  username: string;
  mail: string;
  password?: string;
  birthday: string;
  isActive?: boolean;
  role?: string;
  favorite_tours?: [];
  orders?: [];
}

const CardContact: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const role = checkUserRole(); // Verifica el rol del usuario
      if (role !== 'admin') {
        console.error('User is not authorized to view all users');
        return;
      }

      const session = localStorage.getItem('userSession');
      if (!session) {
        console.error('Session is missing');
        return;
      }

      const { id_token: token } = JSON.parse(session);

      if (!token) {
        console.error('Token is missing');
        return;
      }

      try {
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched users:', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
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
      className="relative p-4 bg-gray-700 hover:bg-gray-800 rounded-2xl shadow-xl cursor-pointer text-white w-60 h-[130px] hover:shadow-2xl transition-shadow"
      onClick={openModal}
    >
      <div className="absolute top-2 left-2 bg-white rounded-full p-2">
        <PiUsersThreeBold className="text-purple-700" size={24} />
      </div>
      <div className="absolute bottom-2 right-2">
        <PiUsersThreeBold className="text-orange-500" size={24} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-5xl font-bold">{users.length}</p>
        <p className="text-lg">Usuarios</p>
      </div>
      {isModalOpen && (
        <UserModal users={users} onClose={closeModal} />
      )}
    </div>
  );
};

export default CardContact;
