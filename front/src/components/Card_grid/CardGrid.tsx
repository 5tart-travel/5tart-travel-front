import Image from 'next/image';
import React, { FC } from 'react';

interface CardGridProps {
  title: string;
  price: number;
  location?: string;
  imageUrl: string;
  oferta: boolean;
  region?: string;
  hotel?: string;
  state?: string;
  country?: string;
  empresa?: string;
}

const CardGrid: FC<CardGridProps> = ({
  title,
  price,
  location,
  imageUrl,
  oferta,
  region,
  hotel,
  state,
  country,
  empresa,
}) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        width={300}
        height={300}
      />
      {oferta && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white font-bold py-1 px-3 rounded-full">
          Oferta
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg text-gray-500 font-semibold">{title}</h3>
        <p className="text-xl text-gray-600 font-bold ">${price}</p>
        {/* <p className="text-gray-600"> {location}</p> */}
        {/* <p className="text-gray-600">{region}</p> */}
        {/* <p className="text-gray-500"> {hotel}</p> */}
        {/* <p className="text-gray-500">{state}</p> */}
        {/* <p className="text-gray-500">{country}</p> */}
        <p className="text-gray-500">{empresa}</p>
      </div>
    </div>
  );
};

export default CardGrid;
