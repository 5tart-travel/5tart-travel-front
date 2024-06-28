// pages/ofertas.tsx
'use client';
import { IBusTour } from '@/interface/IBusTour';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TourCard from './tourCard';


const Ofertas: React.FC = () => {
  const [buses, setBuses] = useState<IBusTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('https://fivetart-travel.onrender.com/tours/oferta');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className='bg-gray-50 flex flex-col items-center p-4'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {buses.map((bus) => (
          <TourCard key={bus.id} tour={bus} />
        ))}
      </div>
    </main>
  );
};

export default Ofertas;
