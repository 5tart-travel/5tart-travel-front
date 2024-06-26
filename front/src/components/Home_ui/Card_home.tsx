import Image from 'next/image';
import React from 'react';

interface CardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ src, alt, title, description }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-[400px] h-auto sm:h-[150px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full sm:w-[200px] h-[200px] sm:h-full">
        <Image
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          width={200}
          height={150}
          layout="responsive"
        />
      </div>
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
