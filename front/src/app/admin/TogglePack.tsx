'use client';
import React from 'react';
import axios, { AxiosError } from 'axios';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface TogglePackProps {
  packageId: string;
  onDelete: (packageId: string) => void;
}

const TogglePack: React.FC<TogglePackProps> = ({ packageId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Obtener el token de autenticación desde localStorage o donde esté almacenado
      const token = localStorage.getItem('userSession');

      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      // Configurar el encabezado de la solicitud con el token
      await axios.delete(`https://fivetart-travel-kafg.onrender.com/tours/${packageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      onDelete(packageId);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Paquete eliminado exitosamente',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error(`Error eliminando el paquete con ID ${packageId}:`, error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al eliminar el paquete',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <FaTrash size={18} />
    </button>
  );
};

export default TogglePack;
