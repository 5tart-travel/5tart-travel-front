'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import TourCard from '@/app/ofertas/tourCard';
import Link from 'next/link';
import { IPlaneTour } from '@/interface/IPlaneTuor';

const PackPlane: React.FC = () => {
  const router = useRouter();
  const [buses, setBuses] = useState<IPlaneTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/tours/plane`);
        if (!response.ok) {
          throw new Error('Falló el fetch de plane tours');
        }
        const data: IPlaneTour[] = await response.json();
        setBuses(data);
      } catch (err) {
        setError('Error fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/travel/tour_plane/${id}`);
  };

  const groupedTours = buses.reduce((acc, tour) => {
    const { region } = tour;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(tour);
    return acc;
  }, {} as Record<string, IPlaneTour[]>);

  const regions = [
    'Patagonia',
    'Noroeste',
    'Cuyo',
    'Pampeana',
    'Litoral',
    'Internacional'

  ];

  return (
    <main className='bg-gray-50 flex flex-col items-center p-4'>
      <section className="max-w-6xl w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Paquetes en Avión</h1>
        <p className="text-lg text-gray-600 mb-4 text-center">Explora los mejores paquetes turísticos Aéreos, Nacionales e Internacionales!!</p>
      </section>
  
      <section className="max-w-6xl w-full mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {regions.map((region) => (
          <a key={region} href={`#${region.toLowerCase().replace(/\s/g, '-')}`}>
            <div className="relative bg-white rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden">
                <Image
                  src={`/images/${region.toLowerCase()}.jpg`}
                  alt={region}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-lg font-semibold italic text-white bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg">
                  {region}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </section>
  
      <section className="max-w-6xl w-full mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Filtros</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Aquí van tus filtros */}
        </div>
      </section>
  
      <div className="w-full max-w-6xl">
        {Object.keys(groupedTours).map((region) => (
          <div key={region} className="mb-8" id={region.toLowerCase().replace(/\s/g, '-')}>
            <div className="flex items-center justify-center mb-4">
              <hr className="border-gray-300 flex-grow opacity-20" />
              <h2 className="text-2xl font-bold border-gray-300 mx-4 opacity-40 my-4">{region}</h2>
              <hr className="border-gray-300 flex-grow opacity-20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedTours[region].map((tour) => (
                <TourCard key={tour.id} tour={tour} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
  
};

export default PackPlane;
