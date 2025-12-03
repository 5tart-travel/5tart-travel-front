import Image from 'next/image';
import React from 'react';

interface ViajesNacProps {
  tema: boolean;
}

const ViajesNacionales: React.FC<ViajesNacProps> = ({ tema }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between mt-20 md:mt-30 ${
        tema ? 'bg-customGray' : 'bg-gray-100'
      } h-auto px-4`}
    >
      {/* Imagen izquierda */}
      <div className="hidden md:flex relative w-1/3 h-64 justify-center items-center">
        <Image
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719878618/uqjfb5kuwhonq9a44kqr.webp"
          alt="Icono de Viajes"
          className={`object-contain ${tema ? 'filter invert' : ''}`}
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
          Viajes Nacionales
        </h2>
      </div>

      {/* Imagen derecha */}
      <div className="hidden md:flex relative w-1/3 h-64 justify-center items-center">
        <Image
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719878618/uqjfb5kuwhonq9a44kqr.webp"
          alt="Icono de Viajes"
          className={`object-contain ${tema ? 'filter invert' : ''}`}
          fill
        />
      </div>
    </div>
  );
};

export default ViajesNacionales;
