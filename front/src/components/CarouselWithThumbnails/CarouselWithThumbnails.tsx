import Image from 'next/image';
import React from 'react';
import Slider from "react-slick";
import Card from '@/components/Home_ui/Card_home'; 

const CarouselWithThumbnails = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="relative w-full h-[600px] lg:h-[500px] md:h-[400px] sm:h-[300px]">
      {/* Banner Image */}
      <div className="flex w-full h-[300px] lg:h-[500px] md:h-[400px] sm:h-[300px]">
        <Image
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1719355788/xuexupstyrirhdwb05bl.jpg"
          alt="logo"
          className="object-cover w-full h-full"
          layout="responsive"
          width={1900}
          height={600}
        />
      </div>
      {/* Cards Carousel */}
      <div className="absolute w-full top-[250px] lg:top-[450px] md:top-[350px] sm:top-[250px] flex justify-center">
        <div className="w-[90%]">
          <Slider {...settings}>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 1"
                title="Card 1"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 2"
                title="Card 2"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 3"
                title="Card 3"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 4"
                title="Card 4"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 5"
                title="Card 5"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 6"
                title="Card 6"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 7"
                title="Card 7"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 8"
                title="Card 8"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
            <div className="px-4">
              <Card
                src="https://via.placeholder.com/100x150"
                alt="Card 9"
                title="Card 9"
                description="Info de la agencia o paquete de viaje xD"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CarouselWithThumbnails;
