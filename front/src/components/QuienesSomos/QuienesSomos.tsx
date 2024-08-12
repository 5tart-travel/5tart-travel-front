'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import NuestrosDatos from "./NuestrosDatos";

const images = [
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720999091/sobre_wwnxut.jpg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720999091/nosotros_rwyvfx.jpg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720999239/otra_vy3utd.jpg',
];

const QuienesSomos = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  ">
      <section className="py-5 mx-5">
        <h3 className="text-center my-5 text-3xl font-bold text-gray-700 text-shadow-medium ">SOBRE NUESTRA PAGINA</h3>
        <Image 
          src={currentImage} 
          alt="Imagen Ilustrativa" 
          width={600}
          height={400}
          className="rounded-md w-100 h-96 lg:w-96 lg:h-88 float-left mr-10 mb-5 transition duration-400 shadow-lg"
        />
        <p className="text-lg leading-6 text-gray-200 ">
          Posicionada como una revelación en la web, <span className="italic font-bold">5tart Travel</span> trae lo mejor del mundo de los viajes y el turismo a tu alcance. Fundada con el objetivo de revolucionar la forma en que las personas planifican y reservan sus aventuras, <span className="italic font-bold">5tart Travel</span> reúne a las mejores agencias de viaje y a los usuarios que buscan experiencias inolvidables en una sola plataforma.
          <br />
          <br />
          <span className="italic">Nuestra misión es: <span className="font-bold">Facilitar el acceso a las mejores experiencias de viaje, conectando a los viajeros con las agencias más destacadas y ofreciendo una amplia variedad de paquetes para todos los gustos y presupuestos.</span></span>
          <br />
          <br />
          Ofrecemos un espacio donde las pequeñas y grandes agencias de turismo pueden destacar sus mejores ofertas, mientras que los usuarios disfrutan de un proceso de búsqueda y compra sencillo y eficiente. En <span className="italic">5tart Travel</span>, nos aseguramos de que cada viaje sea único y memorable, garantizando calidad y satisfacción en cada paso del camino.
        </p>
      </section>

      <NuestrosDatos />

      <hr className=" mx-5 border-indigo-400 border-1 box-shadow-white-semidark  rounded-xl mt-2 " />

      <div className="w-full mt-10">
        <div className="relative">
          <h3 className="text-center my-5 text-2xl text-gray-700 text-shadow-medium font-bold  ">TECNOLOGÍAS UTILIZADAS</h3>
          <div className="flex overflow-x-auto">
            <div className="flex space-x-4">
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978824/docker-svgrepo-com_nkgelp.svg" alt="Docker" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978909/nestjs-svgrepo-com_mila6v.svg" alt="NestJS" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720980190/typeorm-seeklogo_yrhlog.svg" alt="TypeORM" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/nextjs-fill-svgrepo-com_gex3sf.svg" alt="Next.js" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979364/postgresql-svgrepo-com_rshfwh.svg" alt="PostgreSQL" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979053/react-svgrepo-com_zr1hmj.svg" alt="React" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/tailwind-svgrepo-com_uc0ova.svg" alt="Tailwind CSS" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/typescript-svgrepo-com_r27oof.svg" alt="TypeScript" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979359/cloudinary-svgrepo-com_bmgtxs.svg" alt="Cloudinary" width={500} height={500} className="h-10 w-auto" />
              <Image src="https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/vercel-svgrepo-com_ikaimt.svg" alt="Vercel" width={500} height={500} className="h-10 w-auto" />
            </div>
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuienesSomos;
0