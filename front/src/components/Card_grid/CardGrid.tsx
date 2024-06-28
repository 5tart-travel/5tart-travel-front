
import Image from 'next/image';
import React, { FC } from 'react';

interface CardGridProps {
  title: string;
  price: number;
  location: string;
  imageUrl: string;
}

const CardGrid: FC<CardGridProps> = ({ title, price, location, imageUrl }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <Image src={imageUrl} alt={title} className="w-full h-48 object-cover" width={300} height={300} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl text-gray-800">${price}</p>
        <p className="text-gray-600">{location}</p>
      </div>
    </div>
  );
};

export default CardGrid;
