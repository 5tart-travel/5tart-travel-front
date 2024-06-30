import Image from 'next/image';
import React from 'react';

const ViajesNacionales = () => {
  return (
    <div className="flex items-center justify-center mt-40 bg-gray-100 h-40">
      <Image 
        src="https://res.cloudinary.com/dia2gautk/image/upload/v1719785892/zzmhw5xea3n7hxwh4afn.webp" 
        alt="Icono de Viajes" 
        className="mr-4"
        width={150}
        height={150}
      />
      <div className="relative flex items-center">
        <div className="absolute left-0 right-0 h-1 border-dotted border-b border-yellow-500 z-0"></div>
        <h2 className="relative z-10 px-4 text-4xl font-bold text-black">Viajes Nacionales</h2>
      </div>
      <Image 
        src="https://res.cloudinary.com/dia2gautk/image/upload/v1719785892/zzmhw5xea3n7hxwh4afn.webp" 
        alt="Icono de Viajes" 
        className="ml-4"
        width={150}
        height={150}
      />
    </div>
  );
};

export default ViajesNacionales;
