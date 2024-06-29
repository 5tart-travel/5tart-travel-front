// pages/ofertas.tsx
'use client';
import { IBusTour } from '@/interface/IBusTour';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TourCard from './tourCard';
import { da } from '@faker-js/faker';


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
      <section className="max-w-6xl w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Paquetes en Oferta</h1>
        <p className="text-lg text-gray-600 mb-4 text-center">Descubre nuestras mejores ofertas en paquetes turísticos. ¡No te las pierdas!</p>
      </section>
      <section className="max-w-6xl w-full mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Paquetes de Avión</h2>
          <span className="bg-blue-500 text-white px-10 py-1 rounded-full text-sm">Avión</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {buses.map((tour) => {
            if (tour.transportType === 'plane') {
              return <TourCard key={tour.id} tour={tour} />;
            }
            return null;
          })}
        </div>
      </section>
      <section className="max-w-6xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Paquetes de Bus</h2>
          <span className="bg-green-500 text-white px-10 py-1 rounded-full text-sm">Bus</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {buses.map((tour) => {
            if (tour.transportType === 'bus') {
              return <TourCard key={tour.id} tour={tour} />;
            }
            return null; 
          })}
        </div>
      </section>
    </main>
  );
  
  
};

export default Ofertas;
