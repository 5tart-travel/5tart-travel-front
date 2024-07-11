'use client';

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface ToggleUserProps {
  userId: string;
  isActive: boolean;
  onToggle: (userId: string, newStatus: boolean) => void;
}

const ToggleUser: React.FC<ToggleUserProps> = ({ userId, isActive, onToggle }) => {
  const [isChecked, setIsChecked] = useState<boolean>(isActive);

  useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);

  const handleToggleChange = async () => {
    const newStatus = !isChecked;

    try {
      const url = newStatus
        ? `https://fivetart-travel-kafg.onrender.com/user/active/${userId}`
        : `https://fivetart-travel-kafg.onrender.com/user/disable/${userId}`;
      await axios.put(url);
      setIsChecked(newStatus); // Solo se cambia el estado si la petición es exitosa
      onToggle(userId, newStatus);
      alert(`Usuario ${newStatus ? 'activado' : 'desactivado'}`);
    } catch (error: AxiosError | any) {
      console.error(
        `Error actualizando el estado del usuario con ID ${userId}:`,
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('ya se encuentra inactivo')) {
          alert('El usuario ya se encuentra inactivo.');
        } else if (errorMessage.includes('ya esta activo')) {
          alert('El usuario ya está activo.');
        } else {
          alert(`Error: ${errorMessage}`);
        }
      } else {
        console.error("Error details:", error);
        alert('Error actualizando el estado del usuario.');
      }
    }
  };

  return (
    <label className="inline-flex items-center mb-5 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleChange}
        className="sr-only peer"
      />
      <div
        className={`relative w-9 h-5 rounded-full peer-focus:outline-none peer-focus:ring-4 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:rounded-full after:h-4 after:w-4 after:transition-all
          ${isChecked ? 'bg-blue-950 peer-focus:ring-blue-300 after:translate-x-full' : 'bg-gray-400 peer-focus:ring-gray-300 after:translate-x-0'} 
          after:bg-white
        `}
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
    </label>
  );
};

export default ToggleUser;
