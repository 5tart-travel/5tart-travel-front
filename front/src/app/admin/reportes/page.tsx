'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaTrashAlt } from 'react-icons/fa';

interface Notification {
  id: string;
  username: string;
  message: string;
  mail: string;
  telefono: string;
}

const Reportes: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/contact');
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else if (response.data === 'No hay mensajes') {
          setNotifications([]);
        } else {
          console.error('Unexpected response format:', response.data);
          setNotifications([]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  const sendMessage = async (id: string) => {
    try {
      await axios.post(`https://fivetart-travel-kafg.onrender.com/contact/sendEmail/${id}`);
      alert('Mensaje enviado');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await axios.delete(`https://fivetart-travel-kafg.onrender.com/contact/${id}`);
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="p-6 shadow-black/50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="absolute top-2 right-2 cursor-pointer text-blue-500" onClick={() => sendMessage(notification.id)}>
              <FaEnvelope size={20} />
            </div>
            <div className="absolute bottom-2 right-2 cursor-pointer text-red-500" onClick={() => deleteMessage(notification.id)}>
              <FaTrashAlt size={20} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">{notification.username}</h2>
            <p className="text-gray-700 mb-1"><strong>Correo:</strong> {notification.mail}</p>
            <p className="text-gray-700"><strong>Teléfono:</strong> {notification.telefono}</p>
            <p className="text-gray-700 mb-1"><strong>Mensaje:</strong> {notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
