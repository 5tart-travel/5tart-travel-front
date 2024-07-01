import Image from 'next/image';
import React from 'react';

const ViajesNacionales = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-20 md:mt-40 bg-gray-100 h-auto md:h-40">
      <Image 
        src="https://res.cloudinary.com/dia2gautk/image/upload/v1719785892/zzmhw5xea3n7hxwh4afn.webp" 
        alt="Icono de Viajes" 
        className="mr-0 md:mr-4 mb-4 md:mb-0"
        width={150}
        height={150}
      />
      <div className="relative flex items-center">
        <div className="absolute left-0 right-0 h-1 border-dotted border-b border-yellow-500 z-0"></div>
        <h2 className="relative z-10 px-4 text-2xl md:text-4xl font-bold text-black text-center md:text-left">Viajes Nacionales</h2>
      </div>
      <Image 
        src="https://res.cloudinary.com/dia2gautk/image/upload/v1719785892/zzmhw5xea3n7hxwh4afn.webp" 
        alt="Icono de Viajes" 
        className="ml-0 md:ml-4 mt-4 md:mt-0"
        width={150}
        height={150}
      />
    </div>
  );
};

export default ViajesNacionales;
