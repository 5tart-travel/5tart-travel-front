import { CardGridProps } from '@/interface/ITours';
import Image from 'next/image';
import React, { FC } from 'react';

const CardTourDashboard: FC<CardGridProps> = ({
  title,
  price,
  imgUrl,
  oferta,
  empresa,
}) => {
  return (
    <div className="w-full h-70 rounded-2xl shadow-2xl overflow-hidden relative">
      <Image
        src={imgUrl}
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
        <h3 className="text-xl text-gray-50 text-shadow-semidark font-semibold">
          {title}
        </h3>
        <p className="text-2xl text-gray-50 text-shadow-semidark font-bold ">
          ${price}
        </p>
        <p className="text-gray-50">{empresa}</p>
      </div>
    </div>
  );
};

export default CardTourDashboard;
