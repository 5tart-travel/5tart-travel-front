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
    <div className="w-full h-70 rounded-2xl shadow-2xl overflow-hidden relative">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transform hover:scale-110 transition duration-300 ease-in-out"
        width={500}
        height={500}
      />
      {oferta && (
        <div className="absolute top-0 left-0 bg-blue-950 text-white font-bold py-2 px-4 rounded-br-full">
          Oferta
        </div>
      )}
      <div className=" absolute bottom-0 left-0 p-2 bg-blue-600 bg-opacity-35 backdrop-blur-lg shadow-3xl w-[90%] h-auto rounded-2xl flex flex-col mx-4 mb-2 ">
        <h3 className="text-xl text-gray-50 font-semibold">{title}</h3>
        <p className="text-2xl text-gray-50 font-bold ">${price}</p>
        {/* <p className="text-gray-600"> {location}</p> */}
        {/* <p className="text-gray-600">{region}</p> */}
        {/* <p className="text-gray-500"> {hotel}</p> */}
        {/* <p className="text-gray-500">{state}</p> */}
        {/* <p className="text-gray-500">{country}</p> */}
        <p className="text-gray-50">{empresa}</p>
      </div>
    </div>
  );
};

export default CardGrid;
