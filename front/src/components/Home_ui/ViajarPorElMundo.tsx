import Image from 'next/image';
import React from 'react';

const ViajaPorElMundo: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-20 md:mt-40  bg-gray-100 h-auto md:h-40 sm:h-40 xs:h-40 xxs:h-32 ">
      <div className="hidden md:block relative w-full md:w-auto justify-center items-center">
        <Image 
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719784196/v0zrrldwojrq457qhjbt.webp" 
          alt="Avión" 
          className="mr-0 md:mr-4 mb-4 md:mb-0 object-contain"
          layout="responsive"
          width={300}
          height={300}
        />
      </div>
      <div className="relative flex items-center w-full md:w-auto">
        <div className="absolute left-0 right-0 h-1 border-dotted border-b border-yellow-500 z-0"></div>
        <h2 className="relative z-10 px-4 text-2xl md:text-4xl font-bold text-blue-950 text-shadow-semidark text-center md:text-left  sm:text-4xl xs:text-5xl xxs:text-5xl ">Viajá por el mundo</h2>
      </div>
      <div className="hidden md:block relative w-full md:w-auto justify-center items-center">
        <Image 
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719784195/xtjrf8tcjccsfofogloh.webp" 
          alt="Destino" 
          className="ml-0 md:ml-4 mt-4 md:mt-0 object-contain"
          layout="responsive"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default ViajaPorElMundo;
