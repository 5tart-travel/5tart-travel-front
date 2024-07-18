import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Pk_viajes: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 mx-4 my-16 md:my-5">
      <div className="relative w-full md:w-1/2 hover:grayscale transition duration-300">
        <Link href="/travel/pack_bus">
          <Image
            src="https://res.cloudinary.com/dia2gautk/image/upload/v1719447152/i8t9qrkqawuxnx5k2wsl.webp"
            alt="Paquete de Bus"
            className="w-full h-auto md:h-[600px] object-cover rounded-xl shadow-lg"
            width={300}
            height={600}
          />
          <div className="absolute inset-0 flex flex-col justify-start items-center mt-10 p-4 text-center  rounded-xl">
            {/* Posición del texto manejada aquí */}
            <p className="text-xl font-semibold mt-2 text-red-100 text-shadow-semidark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
              Descubre cada rincón de Argentina en bus.
            </p>
            <h1 className="text-5xl font-bold text-red-200 text-shadow-semidark xxs:text-3xl xs:text-3xl sm:text-3xl md:text-5xl lg:text-5xl">
              Pack Bus
            </h1>
            <p className="text-xl font-semibold mt-2 text-red-100 text-shadow-semidark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
              ¡Viaja cómodo, seguro y al mejor precio!
            </p>
          </div>
        </Link>
      </div>
      <div className="relative w-full md:w-1/2 hover:grayscale transition duration-300">
        <Link href="/travel/pack_plane">
          <Image
            src="https://res.cloudinary.com/dia2gautk/image/upload/v1721168839/anlvd0krubbddd0kuvn7.png"
            alt="Paquete de Aéreo"
            className="w-full h-auto md:h-[600px] object-cover rounded-xl shadow-lg"
            width={300}
            height={600}
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center mb-20 p-4 text-center  rounded-xl">
            {/* Posición del texto manejada aquí */}
            <p className="text-xl font-semibold mt-2 text-purple-100 text-shadow-dark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
              Alcanza nuevas alturas con nuestros paquetes de vuelos.
            </p>
            <h1 className="text-5xl font-bold text-purple-200 text-shadow-dark xxs:text-3xl xs:text-3xl sm:text-3xl md:text-5xl lg:text-5xl">
              Pack Vuelos
            </h1>
            <p className="text-xl font-semibold mt-2 text-purple-100 text-shadow-dark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
              ¡Reserva hoy y vuela hacia tu próxima aventura!
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Pk_viajes;
