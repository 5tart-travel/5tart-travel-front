import Image from 'next/image';
import React from 'react';

const ViajaPorElMundo = () => {
  return (
    <div className="flex items-center justify-center mt-40 bg-gray-100 h-40">
      <Image 
        src="https://res.cloudinary.com/dia2gautk/image/upload/v1719784196/v0zrrldwojrq457qhjbt.webp" 
        alt="Avión" 
        className="mr-4"
        width={300}
        height={300}
      />
      <div className="relative flex items-center">
        <div className="absolute left-0 right-0 h-1 border-dotted border-b border-yellow-500 z-0"></div>
        <h2 className="relative z-10 px-4 text-4xl font-bold text-black">Viajá por el mundo</h2>
      </div>
      <Image 
        src="https://res.cloudinary.com/dia2gautk/image/upload/v1719784195/xtjrf8tcjccsfofogloh.webp" 
        alt="Destino" 
        className="ml-4"
        width={300}
        height={300}
      />
    </div>
  );
};

export default ViajaPorElMundo;
