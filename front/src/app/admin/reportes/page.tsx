/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAlternateEmail } from 'react-icons/md';
import { RiMailSendFill } from 'react-icons/ri';
import { HiMailOpen } from "react-icons/hi";
import { FaDeleteLeft, FaHubspot, FaEye } from 'react-icons/fa6';
import Link from 'next/link';
import Swal from 'sweetalert2';
import ReactCardFlip from 'react-card-flip';

interface Notification {
  id: string;
  username: string;
  message: string;
  mail: string;
  telefono: string;
}

const Reportes: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [flipped, setFlipped] = useState<string | null>(null);

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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/sendEmail/${id}`);
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'custom-swal2-popup',
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`);
      setNotifications(notifications.filter(notification => notification.id !== id));
      Swal.fire({
        icon: "success",
        title: "Mensaje eliminado",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'custom-swal2-popup',
        },
      });
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleFlip = (id: string) => {
    setFlipped(flipped === id ? null : id);
  };

  return (
    <div className="p-6 shadow-black/50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <ReactCardFlip
            key={notification.id}
            isFlipped={flipped === notification.id}
            flipDirection="horizontal"
          >
            {/* Frente de la card  */}
            <div
              className="relative max-w-md w-full bg-indigo-100 rounded-2xl overflow-hidden flex box-shadow-white-medium hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer hover:box-shadow-white-medium"
              onClick={() => handleFlip(notification.id)}
            >
              <div className="w-1/3 bg-blue-950 flex flex-col justify-between p-4">
                <div className="text-center">
                  <h3 className="text-xl text-gray-200 font-semibold mb-1">{notification.username}</h3>
                  <p className="text-base text-gray-200 font-semibold mb-1">Tel:</p>
                  <p className="text-indigo-500 text-sm text-shadow-white-semilight">{notification.telefono}</p>
                </div>
                <div className="mt-4 mx-auto">
                  <img src="/star_travel.png" alt="Star Travel Logo" className="w-16 h-16" />
                </div>
              </div>
              <div className="w-2/3 p-4 relative">
                <div className="absolute inset-y-0 left-0 w-[6px] bg-indigo-500"></div>
                <div className="pl-6">
                  <div className="flex items-center mb-4 group">
                    <MdAlternateEmail className="text-blue-950 text-xl mr-3 flex-shrink-0" />
                    <Link href={`mailto:${notification.mail}`} className="text-gray-800 truncate w-[100px] relative">
                      {notification.mail}
                      <span className="block w-0 h-[3px] bg-indigo-950 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                  <div className="flex mb-4 gap-2 text-gray-700 text-sm cursor-pointer ">
                    <FaHubspot className="w-10 text-blue-950" />
                    {notification.message.slice(0, 50)}...
                  </div>
                  <div className="flex items-center space-x-4 mt-6 absolute bottom-6 gap-20">
                    <button className="cursor-pointer text-red-500 hover:text-red-300" onClick={(e) => { e.stopPropagation(); deleteMessage(notification.id); }}>
                      <FaDeleteLeft size={30} />
                    </button>
                    <button className="cursor-pointer text-blue-950 hover:text-indigo-500" onClick={(e) => { e.stopPropagation(); sendMessage(notification.id); }}>
                      <RiMailSendFill size={30} />
                    </button>
                 
                  </div>
                </div>
              </div>
            </div>

            {/* cara trasera de la card */}
            <div
              className="relative max-w-md w-full h-full bg-indigo-100  box-shadow-white-medium hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer rounded-2xl overflow-hidden p-6 text-gray-100"
              onClick={() => handleFlip(notification.id)}
            >
              <HiMailOpen size={30} className="absolute top-8 right-14 text-white z-10 " />
              <h3 className="text-xl font-semibold mb-2 bg-blue-950 px-4 py-2 rounded-br-full rounded-tl-full ">{notification.username}:</h3>
              <p className="mb-4 text-gray-700 ">{notification.message}</p>
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
