import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Pk_viajes: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 mx-4 my-16 md:my-5">
      <div className="w-full md:w-1/2">
        <Link href="/travel/pack_bus">
          <Image 
            src="https://res.cloudinary.com/dia2gautk/image/upload/v1719447152/i8t9qrkqawuxnx5k2wsl.webp" 
            alt="Paquete de Vuelo" 
            className="w-full h-auto md:h-[800px] object-cover rounded-xl shadow-lg hover:grayscale transition duration-300"
            width={400} 
            height={800}
          />
        </Link>
      </div>
      <div className="w-full md:w-1/2">
        <Link href="/travel/pack_plane">
          <Image 
            src="https://res.cloudinary.com/dia2gautk/image/upload/v1719447152/cpkgaywutd8tzxwqwaoa.webp" 
            alt="Paquete de Bus" 
            className="w-full h-auto md:h-[800px] object-cover rounded-xl shadow-lg hover:grayscale transition duration-300"
            width={400} 
            height={800}
          />
        </Link>
      </div>
    </div>
  );
};

export default Pk_viajes;
