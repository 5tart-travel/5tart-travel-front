'use client'
import React, { useEffect, useRef, useState } from 'react';


interface Notification {
  username: string;
  message: string;
  mail?: string;
  telefono?: string;
}

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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

  const isArray = Array.isArray(notifications);

  const handleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-20 pt-20">
      <div ref={modalRef} className="bg-white mt-16 p-4 rounded-lg shadow-sm relative w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4">
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-8 text-black bg-transparent rounded-full p-1 focus:outline-none"
        >
          <AiOutlineCloseCircle className="w-9 h-9 text-gray-500 hover:text-gray-600" />
        </button> */}
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar text-gray-700">
          <h2 className="flex justify-center text-2xl font-bold text-gray-600 mb-4">Detalles de Notificaciones</h2>
          <ul className="space-y-2">
            {isArray ? (
              notifications.map((notification, index) => (
                <li 
                  key={index} 
                  className={`border-b pb-2 p-4 rounded-md ${expandedIndex === index ? 'bg-blue-200' : 'bg-gray-200  '}`}
                  onClick={() => handleExpand(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <p className="text-lg font-semibold"><strong>Nombre:</strong> {notification.username}</p>
                  <p><strong>Email:</strong> {notification.mail}</p>
                  <p><strong>Teléfono:</strong> {notification.telefono}</p>
                  <p className={`${expandedIndex === index ? 'whitespace-normal' : 'truncate'}`}><strong>Mensaje:</strong> {notification.message}</p>
                </li>
              ))
            ) : (
              <p>No notifications available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
