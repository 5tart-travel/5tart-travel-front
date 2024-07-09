'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBell } from 'react-icons/fi';
import NotificationModal from './NotificationModal';

interface Notification {
  username: string;
  message: string;
  mail: string;
  telefono: string;
}

const CardBox: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('API CON WEB SOCKET');
        console.log('Fetched notifications:', response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  return (
    <div className="relative p-4 bg-sky-500 hover:bg-sky-700  rounded-2xl shadow-2xl cursor-pointer text-white w-60 h-[130px] hover:shadow-xl transition-shadow  " onClick={openModal}>
      <div className="absolute top-2 left-2 bg-white rounded-full p-2">
        <FiBell className="text-purple-700" size={24} />
      </div>
      <div className="absolute bottom-2 right-2">
        <FiBell className="text-orange-500" size={24} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-5xl font-bold">{notifications.length}</p>
        <p className="text-lg">Inbox</p>
      </div>
      {isModalOpen && (
        <NotificationModal notifications={notifications} onClose={closeModal} />
      )}
    </div>
  );
};

export default CardBox;
