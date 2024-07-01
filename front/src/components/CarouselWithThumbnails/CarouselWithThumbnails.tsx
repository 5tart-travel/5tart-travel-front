




import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Card from '@/components/Home_ui/Card_home';
import Spiner from '@/components/ui/Spiner';
import Link from 'next/link';

const CarouselWithThumbnails: React.FC = () => {
  const [agencias, setAgencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgencias = async () => {
    console.log('Fetching agencias...');
    try {
      const response = await fetch('https://fivetart-travel-kafg.onrender.com/agency');
      const data = await response.json();
      console.log('Agencias fetched:', data);
      setAgencias(data);
    } catch (error) {
      console.error('Error fetching agencias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgencias();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-16 relative w-full h-[600px] lg:h-[500px] md:h-[400px] sm:h-[300px]">
      {/* Banner Image */}
      <div className="relative flex w-full h-[300px] lg:h-[500px] md:h-[400px] sm:h-[300px]">
        <Image
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719355788/xuexupstyrirhdwb05bl.jpg"
          alt="logo"
          className="object-cover w-full h-full"
          fill
          priority={true}
        />
        <div className="absolute top-20 right-10 text-left p-4">
        <p className="text-lg mt-2 text-gray-50 text-shadow-semidark ">Te llevamos a donde quieras ir.</p>
          <h1 className="text-5xl font-bold text-gray-50 text-shadow-semidark ">Encuentra tu próximo viaje</h1>
          <p className="text-lg mt-2 text-gray-50 text-shadow-semidark "> Recorre Argentina y el mundo entero de la forma más sencilla.  <br /> ¡Vamos todos a viajar!</p>
          <Link href="/travel">
          <button className="mt-4 px-6 py-3 bg-blue-950 rounded-xl hover:bg-blue-700 text-white">Buscar viajes</button>
          </Link>
        </div>
      </div>
      {/* Cards Carousel */}
      <div className="absolute w-full top-[250px] lg:top-[450px] md:top-[350px] sm:top-[250px] flex justify-center">
        <div className="w-[100%]">
          {loading ? (
            <div><Spiner /></div>
          ) : agencias.length === 0 ? (
            <p>No agencias available</p>
          ) : (
            <Slider {...settings}>
              {agencias.map((agencia) => (
                <div className="px-4" key={agencia.id}>
                  <Link href={`/agencias/${agencia.id}`} passHref>
                  <Card
                        src={agencia.imgUrl || '/default-image.png'}
                        alt={agencia.name_agency}
                        name={agencia.name_agency}
                        address={agencia.address}
                        // agency={agencia.agency.name_agency}
                      />
                  </Link>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarouselWithThumbnails;
