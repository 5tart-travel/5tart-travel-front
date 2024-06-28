import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Card from '@/components/Home_ui/Card_home';
import Spiner from '@/components/ui/Spiner';

const CarouselWithThumbnails: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    console.log('Fetching tours...');
    try {
      const response = await fetch('https://fivetart-travel.onrender.com/tours');
      const data = await response.json();
      console.log('Tours fetched:', data);
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
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
    <div className=" mb-16 relative w-full h-[600px] lg:h-[500px] md:h-[400px] sm:h-[300px]">
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
        <div className="w-[100%]">
          {loading ? (
            <div> <Spiner /> </div>
          ) : tours.length === 0 ? (
            <p>No tours available</p>
          ) : (
            <Slider {...settings}>
              {tours.map((tour) => (
                <div className="px-4" key={tour.id}>
                  <Card
                    src={tour.imgUrl}
                    alt={tour.title}
                    title={tour.title}
                    price={tour.price}
                    agency={tour.agency.name_agency}
                  />
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
