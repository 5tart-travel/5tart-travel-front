import Link from 'next/link';
import React from 'react';

const TravelBanner: React.FC = () => {
  return (
    <div
      className="relative w-screen h-[500px] md:h-[550px] flex flex-col justify-center items-center text-center text-gray-700"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dia2gautk/image/upload/v1719538399/qlk0ggedcdxekt6jvs1j.webp')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-transparent absolute top-10 left-0 w-full h-full">
        <h1 className="text-4xl text-blue-950 font-bold mr-40 text-shadow-semidark ">Viaja   </h1>
        <h2 className="text-3xl text-orange-300 ml-16 font-bold text-shadow-semidark">al mejor destino</h2>
        <h3 className='text-4xl text-blue-950 ml-44 font-bold text-shadow-semidark' >del mundo</h3>
        <p className="mt-4 ml-20  text-base font-normal text-shadow-semilight ">Descubre paisajes asombrosos <br /> y vive experiencias inolvidables.</p>

        <div className="mt-10 ml-16 ">
            <Link href="/ofertas" >
          <button className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-4 px-4 rounded-2xl">Explora ahora</button>
            </Link>
        </div>

        <p className="mt-4 ml-[33rem] w-3/12 text-base font-semibold text-shadow-semilight ">¡Reserva ahora y obtén un 20% de descuento!</p>
        <div className="mt-[160px] m-36 text-left text-sm text-shadow-medium">
          <p>Visítanos en <a href="#" className="underline  ">www.starttravel.com</a> o llámanos al <a href="tel:123-456-7890" className="underline">123-456-7890</a></p>
        </div>
      </div>
    </div>
  );
};

export default TravelBanner;
