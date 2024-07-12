'use client';

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface ToggleAgencyProps {
  agencyId: string;
  isActive: boolean;
  onToggle: (agencyId: string, newStatus: boolean) => void;
}

const ToggleAgency: React.FC<ToggleAgencyProps> = ({ agencyId, isActive, onToggle }) => {
  const [isChecked, setIsChecked] = useState<boolean>(isActive);

  useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);

  const handleToggleChange = async () => {
    const newStatus = !isChecked;

    try {
      const url = newStatus
        ? `https://fivetart-travel-kafg.onrender.com/agency/active/${agencyId}`
        : `https://fivetart-travel-kafg.onrender.com/agency/disable/${agencyId}`;
      await axios.put(url);
      setIsChecked(newStatus); // Solo se cambia el estado si la petición es exitosa
      onToggle(agencyId, newStatus);
      alert(`Agencia ${newStatus ? 'activada' : 'desactivada'}`);
    } catch (error: AxiosError | any) {
      console.error(
        `Error actualizando el estado de la agencia con ID ${agencyId}:`,
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('ya se encuentra inactiva')) {
          alert('La agencia ya se encuentra inactiva.');
        } else if (errorMessage.includes('ya esta activa')) {
          alert('La agencia ya está activa.');
        } else {
          alert(`Error: ${errorMessage}`);
        }
      } else {
        console.error("Error details:", error);
        alert('Error actualizando el estado de la agencia.');
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

export default ToggleAgency;
