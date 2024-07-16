import Image from 'next/image';
import React from 'react';

interface CardProps {
  src: string;
  alt: string;
  name: string;
  address: number;
  tema: boolean;
}

const Card: React.FC<CardProps> = ({ src, alt,name,address, tema  }) => {
  return (
    <div className={`flex w-full sm:w-[400px] h-auto sm:h-[150px] ${ tema ?  'bg-gray-900' : 'bg-white' } shadow-xl rounded-2xl overflow-hidden`}>
      <div className="w-full sm:w-[300px] h-[200px] sm:h-full relative">
        <Image
          src={src}
          alt={alt}
          className="object-cover"
          layout="fill"
        />
      </div>
      <div className="p-4 flex flex-col justify-center">
        <h3 className={`text-lg ${ tema ? 'text-gray-300' : 'text-blue-800' }  text-shadow-medium font-bold`}>{name}</h3>
        {/* <p className="text-lg font-semibold text-gray-600 ">Precio: ${price.toLocaleString()}</p> */}
        <p className={`text-sm ${ tema ?  'text-gray-400' : 'text-gray-500' }`}>Direcion: {address}</p>
      </div>
    </div>
  );
};

export default Card;
