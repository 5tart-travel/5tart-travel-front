'use client';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

interface ToggleUserProps {
  userId: string;
  isActive: boolean;
  onToggle: (userId: string, newStatus: boolean) => void;
}

const ToggleUser: React.FC<ToggleUserProps> = ({
  userId,
  isActive,
  onToggle,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isActive);

  useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);

  const handleToggleChange = async () => {
    const newStatus = !isChecked;

    try {
      const url = newStatus
        ? `${process.env.NEXT_PUBLIC_API_URL}/user/active/${userId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/user/disable/${userId}`;
      await axios.put(url);
      setIsChecked(newStatus); //? Solo se cambia el estado si la petición es exitosa
      onToggle(userId, newStatus);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Usuario ${newStatus ? 'activado' : 'desactivado'}`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'custom-swal2-popup',
        },
      });
    } catch (error: AxiosError | any) {
      console.error(
        `Error actualizando el estado del usuario con ID ${userId}:`,
        error.response ? error.response.data : error.message,
      );
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('ya se encuentra inactivo')) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Desactivado',
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (errorMessage.includes('ya esta activo')) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Activado',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire(`Error: ${errorMessage}`);
        }
      } else {
        console.error('Error details:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al actualizar el estado del usuario',
          showConfirmButton: false,
          timer: 1500,
        });
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
          ${
            isChecked
              ? 'bg-blue-950 peer-focus:ring-blue-300 after:translate-x-full'
              : 'bg-gray-400 peer-focus:ring-gray-300 after:translate-x-0'
          } 
          after:bg-white
        `}
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
    </label>
  );
};

export default ToggleUser;
