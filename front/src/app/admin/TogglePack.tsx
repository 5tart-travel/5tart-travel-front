'use client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface TogglePackProps {
  packageId: string;
  onDelete: (packageId: string) => void; 
}

const TogglePack: React.FC<TogglePackProps> = ({ packageId, onDelete }) => {
  const handleDelete = () => {
    onDelete(packageId); 
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 bg-white rounded-full p-3 border-4 border-red-500 hover:border-red-700" >
      <FaTrash size={18} />
    </button>
  );
};

export default TogglePack;
