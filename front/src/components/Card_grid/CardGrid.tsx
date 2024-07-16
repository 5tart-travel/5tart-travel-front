import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

export interface CardGridProps {
  id: string;
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
  transportType: 'plane' | 'bus';
}

const CardGrid: FC<CardGridProps> = ({
  id,
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
  transportType,
}) => {
  return (
    <div className="relative w-full h-[300px] rounded-2xl shadow-2xl overflow-hidden">
      <Link href={`/travel/pack_${transportType}/${id}`} key={id}>
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition duration-300 ease-in-out"
            layout="fill"
            objectFit="cover"
          />
          {oferta && (
            <div className="absolute top-0 left-0 bg-blue-950 text-white font-bold py-2 px-4 rounded-br-full">
              Oferta
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-2 bg-blue-600 bg-opacity-35 backdrop-blur-lg shadow-3xl w-[90%] h-auto rounded-2xl flex flex-col mx-4 mb-2">
            <h3 className="text-xl text-gray-50 text-shadow-semidark font-semibold">
              {title}
            </h3>
            <p className="text-2xl text-gray-50 text-shadow-semidark font-bold">
              ${price}
            </p>
            <p className="text-gray-50">{empresa}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardGrid;
