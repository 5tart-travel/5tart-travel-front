import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Card from '@/components/Home_ui/Card_home';
import BouncingDotsLoader from '@/components/ui/BouncingDotsLoader';
import Link from 'next/link';

interface CarouselProps {
  tema: boolean;
}

const CarouselWithThumbnails: React.FC<CarouselProps> = ({ tema }) => {
  const [agencias, setAgencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgencias = async () => {
    console.log('Fetching agencias...');
    try {
      const response = await fetch(
        `https://5tart-back-production.up.railway.app/agency`,
      );
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
        <div className="absolute right-10 text-left p-4 max-w-xl xxs:my-0 xxs:right-5 xs:my-0 xs:right-7 sm:my-0 sm:right-7 md:my-10 md:right-7 lg:my-20 lg:right-9">
          <p className="text-lg mt-2 text-gray-50 text-shadow-semidark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
            Te llevamos a donde quieras ir.
          </p>
          <h1 className="text-5xl font-bold text-gray-50 text-shadow-semidark xxs:text-3xl xs:text-3xl sm:text-3xl md:text-5xl lg:text-5xl">
            Encuentra tu próximo viaje
          </h1>
          <p className="text-lg mt-2 text-gray-50 text-shadow-semidark xxs:text-sm xs:text-base sm:text-base md:text-lg lg:text-xl">
            Recorre Argentina y el mundo entero de la forma más sencilla. <br />{' '}
            ¡Vamos todos a viajar!
          </p>
        </div>

        <div className="absolute xl:top-[260px] xl:right-[530px] lg:top-[260px] lg:right-[500px] md:top-[260px] md:right-[400px] sm:top-[130px] sm:right-[380px] xs:top-[170px] xs:right-[50px] xxs:top-[140px] xxs:right-[70px]">
          <Link href="/travel">
            <button
              className={`mt-4 px-6 py-3 ${
                tema
                  ? 'bg-black hover:bg-gray-900'
                  : 'bg-blue-950 hover:bg-blue-900'
              } rounded-xl  shadow-xl text-white sm:px-4 sm:py-2 sm:mb-96 md:px-5 md:py-2.5 lg:px-6 lg:py-3`}
            >
              Buscar viajes
            </button>
          </Link>
        </div>
      </div>
      {/* Cards Carousel */}
      <div className="absolute w-full top-[250px] lg:top-[450px] md:top-[350px] sm:top-[250px] flex justify-center">
        <div className="w-[100%]">
          {loading ? (
            <BouncingDotsLoader />
          ) : agencias.length === 0 ? (
            <p>No agencias available</p>
          ) : (
            <Slider {...settings}>
              {agencias
                .filter((agencia) => agencia.isActive) //? Agregue el filtro para solo mostrar agencias activadas por el admin
                .map((agencia) => (
                  <div className="px-4" key={agencia.id}>
                    <Link href={`/agencias/${agencia.id}`} passHref>
                      <Card
                        src={agencia.imgUrl || '/default-image.png'}
                        alt={agencia.name_agency}
                        name={agencia.name_agency}
                        address={agencia.address}
                        tema={tema}
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
