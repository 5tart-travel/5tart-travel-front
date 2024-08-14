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
      await axios.delete(`https://fivetart-travel-kafg.onrender.com/tours/${packageId}`);
      onDelete(packageId);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Paquete eliminado exitosamente',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error: AxiosError | any) {
      console.error(`Error eliminando el paquete con ID ${packageId}:`, error.message);
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
