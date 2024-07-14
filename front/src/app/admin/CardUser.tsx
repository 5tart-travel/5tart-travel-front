
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import { PiUsersThreeBold } from "react-icons/pi";

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

interface CardContactProps {}

const CardUser: React.FC<CardContactProps> = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const userSession = localStorage.getItem('userSession');
      const token = userSession ? JSON.parse(userSession).token : '';

      const response = await axios.get('https://fivetart-travel-kafg.onrender.com/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = () => {
    fetchUsers();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  return (
    <div
      className="relative p-4 bg-white hover:bg-slate-50 rounded-2xl shadow-xl cursor-pointer text-white w-60 h-[150px] hover:shadow-2xl transition-shadow"
      onClick={openModal}
    >
      <div className="absolute top-2 left-2 bg-white rounded-full p-2">
        <PiUsersThreeBold className="text-lime-700" size={36} />
      </div>
      <div className="absolute bottom-2 right-2">
        <PiUsersThreeBold className="text-yellow-500" size={36} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-5xl text-gray-600 text-shadow-medium font-bold">{users.length}</p>
        <p className="text-xl text-gray-600 text-shadow-medium font-semibold">Usuarios</p>
      </div>
      {isModalOpen && (
        <UserModal users={users} onClose={closeModal} />
      )}
    </div>
  );
};

export default CardUser;
