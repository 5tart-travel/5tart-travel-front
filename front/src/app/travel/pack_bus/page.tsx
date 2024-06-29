'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IBusTour } from '@/interface/IBusTour';
import TourCard from '@/app/ofertas/tourCard';



const PackBus: React.FC = () => {
  const router = useRouter();
  const [buses, setBuses] = useState<IBusTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('https://fivetart-travel.onrender.com/tours/bus');
        if (!response.ok) {
          throw new Error('Falló el fetch de bus tours');
        }
        const data: IBusTour[] = await response.json();
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
    router.push(`/travel/${id}`);
  };

  return (
    <main className='bg-gray-50 flex flex-col items-center p-4'>
      <section className="max-w-6xl w-full mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Paquetes en Bus</h1>
      <p className="text-lg text-gray-600 mb-4 text-center">Explora los mejores paquetes turísticos en bus por toda Argentina!!</p>
   </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {buses.map((bus) => (
          <TourCard key={bus.id} tour={bus} />
        ))}
      </div>
    </main>
  );
};

export default PackBus;

