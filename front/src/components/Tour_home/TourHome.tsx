import React, { useEffect, useState } from 'react';
import CardGrid from '@/components/Card_grid/CardGrid';

interface Tour {
  id: string;
  title: string;
  price: number;
  region: string;
  imgUrl: string;
  oferta: boolean;
  transportType: 'plane' | 'bus';
  isActive:boolean;
}

const TourHome: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://fivetart-travel-kafg.onrender.com/tours');
        const data = await response.json();
        const filteredTours = data.filter((tour: Tour) => tour.region !== 'Internacional' && tour.isActive);
        setTours(filteredTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {tours.map((tour) => (
        <CardGrid
          key={tour.id}
          id={tour.id}
          title={tour.title}
          price={tour.price}
          region={tour.region}
          imageUrl={tour.imgUrl}
          oferta={tour.oferta}
          transportType={tour.transportType}
        />
      ))}
    </div>
  );
};

export default TourHome;
