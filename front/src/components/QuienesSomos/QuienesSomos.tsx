'use client';

import NuestrosDatos from './NuestrosDatos';
import ReactPlayer from 'react-player';
import TecnologiasUtilizadas from './TecnologiasUtilizadas';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const DynamicReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const QuienesSomos = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full relative">
      {/* Banner con video */}
      <div className="relative flex w-full h-[300px] lg:h-[500px] md:h-[400px] sm:h-[300px]">
        <div className="w-full h-[350px] bg-black  flex justify-center items-center overflow-hidden">
          <ReactPlayer
            url="https://res.cloudinary.com/dia2gautk/video/upload/v1723517461/1104507_1080p_Come_1920x1080_hrxph9_gtwszu.mp4"
            playing={true}
            loop={true}
            controls={true}
            width="100vw"
            height="auto"
            muted={true}
          />
          <div className="absolute top-[65%]">
            <TecnologiasUtilizadas />
          </div>
          <div className="absolute text-xs right-10 text-left  max-w-xl xxs:my-0 xxs:right-5 xs:my-0 xs:right-7 sm:my-0 sm:right-7 md:my-10 md:right-7 lg:my-20 lg:right-9">
            <p className="text-lg mt-2 text-gray-50 text-shadow-semidark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
              Conectamos a viajeros con las mejores agencias.
            </p>
            <h1 className="text-5xl font-bold text-gray-50 text-shadow-semidark xxs:text-3xl xs:text-3xl sm:text-3xl md:text-5xl lg:text-5xl">
              Descubre y reserva tus viajes ideales
            </h1>
            <p className="text-lg mt-2 text-gray-50 text-shadow-semidark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
              Star Travel es tu puerta de entrada a un mundo de aventuras.
              Facilitamos el contacto entre agencias y viajeros, ofreciendo una
              amplia gama de paquetes turísticos para todos los gustos y
              presupuestos. ¡Explora con facilidad y encuentra tu próxima
              experiencia inolvidable!
            </p>
          </div>
        </div>
      </div>

      <NuestrosDatos />
    </div>
  );
};

export default QuienesSomos;
