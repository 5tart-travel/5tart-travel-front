'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IBusTour } from '@/interface/IBusTour';
import TourCard from '@/app/ofertas/tourCard';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import FilterComponent from '@/components/FiltrosPack/FiltrosPackBus/FilterComponent';
import Swal from 'sweetalert2'; 

const PackBus: React.FC = () => {
  const router = useRouter();
  const [buses, setBuses] = useState<IBusTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTours, setFilteredTours] = useState<IBusTour[]>([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    Swal.fire({
      title: 'NO TOCAR NADA!',
      text: 'YA LO VOY A TERMINAR. :)',
      icon: 'warning',
      confirmButtonText: 'LOQUITA'
    });
  }, []);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tours/bus`,
        );
        if (!response.ok) {
          throw new Error('Falló el fetch de bus tours');
        }
        const data: IBusTour[] = await response.json();
        setBuses(data);
        setFilteredTours(data);
      } catch (err) {
        setError('Error fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  useEffect(() => {
    setNoResults(filteredTours.length === 0);
  }, [filteredTours]);

  const handleCardClick = (id: string) => {
    router.push(`/travel/pack_bus/${id}`);
  };

  return (
    <main className="flex bg-gray-100 min-h-screen bg-black">
      <aside className="w-1/4 p-4 border-r border-gray-200 text-gray-500 ">
        <FilterComponent buses={buses} setFilteredTours={setFilteredTours} />
      </aside>
      <div className="flex flex-col items-center p-4 w-full bg-blue-500">
        <div className="max-w-6xl w-full flex bg-red-900 rounded-md shadow-md">
          <section className="p-4">
            {noResults ? (
              <section className="max-w-6xl w-full mb-8">
                <h2 className="text-xl font-bold text-center ">
                  No se encontraron tours según los filtros aplicados
                </h2>
              </section>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {filteredTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center mb-16">
              <Link href={'/travel'}>
                <BackButton />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PackBus;
