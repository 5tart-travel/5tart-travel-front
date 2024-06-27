import React from 'react';
import Image from 'next/image';
import { IAgencias } from '@/interface/IAgencias';

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

const CardAgencia: React.FC<{ agencia: IAgencias }> = ({ agencia }) => {
  const truncatedTitle = agencia.shelter_name ? truncateDescription(agencia.shelter_name, 25) : '';
  const truncatedDescription = agencia.description ? truncateDescription(agencia.description, 55) : '';
  return (
    <div className="bg-transparent border-t-4 border-lime500 rounded-xl shadow-xl p-4 m-2 md:m-4 max-w-xs mx-auto transform transition-transform duration-200 hover:scale-105">
      <div className="h-64 relative overflow-hidden rounded-t-lg">
        <Image src={agencia.imgUrl} alt={agencia.name} layout="fill" objectFit="cover" />
      </div>
      <div className="mt-4">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{truncatedTitle}</h5>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{agencia.location} - {agencia.zona}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{truncatedDescription}</p>
        <a href={`/refugios/${agencia.id}`} className="border border-lime500 inline-block mt-4 px-4 py-2 text-sm font-semibold text-gray-800 rounded-xl hover:bg-lime500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          Leer más
        </a>
      </div>
    </div>
  );
};

export default CardAgencia;
