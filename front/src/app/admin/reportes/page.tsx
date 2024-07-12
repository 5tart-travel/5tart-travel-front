'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div className="p-6 shadow-black/50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Reportes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">{notification.username}</h2>
            <p className="text-gray-700 mb-1"><strong>Mensaje:</strong> {notification.message}</p>
            <p className="text-gray-700 mb-1"><strong>Correo:</strong> {notification.mail}</p>
            <p className="text-gray-700"><strong>Teléfono:</strong> {notification.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
