import Image from 'next/image';
import React from 'react';

interface ViajaProps {
  tema: boolean;
}

const ViajaPorElMundo: React.FC<ViajaProps> = ({ tema }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center justify-between ${
        tema ? 'bg-customGray md:mt-30' : 'bg-gray-100 md:mt-40'
      } h-auto md:h-custom-1 px-4`}
    >
      {/* Imagen izquierda */}
      <div className="hidden md:flex relative w-1/3 h-64 justify-center items-center">
        <Image
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719784196/v0zrrldwojrq457qhjbt.webp"
          alt="Avión"
          className="object-contain"
          fill
        />
      </div>

      {/* Texto */}
      <div className="relative flex items-center w-full md:w-[30%] md:ml-[6%] text-center">
        <div className="absolute left-0 right-0 h-1 border-dotted border-b border-yellow-500 z-0"></div>
        <h2
          className={`relative z-10 px-4 lg:text-3xl md:text-4xl font-bold ${
            tema ? 'text-white' : 'text-blue-950'
          } text-shadow-semidark`}
        >
          Viajá por el mundo
        </h2>
      </div>

      {/* Imagen derecha */}
      <div className="hidden md:flex relative w-1/3 h-64 justify-center items-center">
        <Image
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719784195/xtjrf8tcjccsfofogloh.webp"
          alt="Destino"
          className="object-contain"
          fill
        />
      </div>
    </div>
  );
};

export default ViajaPorElMundo;
