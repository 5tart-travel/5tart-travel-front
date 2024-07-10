'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IBusTour } from '@/interface/IBusTour';
import TourCard from '@/app/ofertas/tourCard';
import FilterComponent from '@/components/FiltrosPack/FilterComponent';
import '../../../components/Styles/ErrorBus.css';

const PackBus: React.FC = () => {
  const router = useRouter();
  const [buses, setBuses] = useState<IBusTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTours, setFilteredTours] = useState<IBusTour[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [uniqueStates, setUniqueStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tours/plane`,
        );
        if (!response.ok) {
          throw new Error('Falló el fetch de bus tours');
        }
        const data: IBusTour[] = await response.json();
        setBuses(data);
        setFilteredTours(data);

        const uniqueStatesSet = new Set(data.map((tour) => tour.state));
        const uniqueStatesArray = Array.from(uniqueStatesSet).sort();
        setUniqueStates(uniqueStatesArray);
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedState(selectedValue);

    if (selectedValue === '') {
      setFilteredTours(buses);
    } else {
      const filtered = buses.filter((tour) => tour.state === selectedValue);
      setFilteredTours(filtered);
    }
  };

  return (
    <main className="flex bg-gray-100 min-h-screen">
      <aside className="hidden md:block w-1/4 p-4 border-r border-gray-200 text-gray-500 ">
        <FilterComponent buses={buses} setFilteredTours={setFilteredTours} />
      </aside>
      <div className="flex flex-col items-center p-4 w-full bg-gray-100">
        <div className="relative w-full mb-4 sm:hidden">
          <div className="relative">
            <select
              value={selectedState}
              onChange={handleSelectChange}
              className="block w-full px-4 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:border-blue-500 max-h-40 overflow-y-auto"
              size={Math.min(uniqueStates.length, 4)}
            >
              <option value="">Todos</option>
              {uniqueStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="max-w-6xl w-full flex bg-white rounded-md shadow-md">
          <section className="p-4 w-full">
            {noResults ? (
              <div className="container mx-auto p-4 flex justify-center">
                <div className="rounded-lg overflow-hidden p-4 w-full h-[400px] max-w-2xl relative">
                  <div className="airplane"></div>{' '}
                  <h2 className="flex justify-center text-gray-600 mt-[100px] text-xl font-bold mb-4 ">
                    No se encontraron tours según los filtros aplicados
                  </h2>
                </div>
              </div>
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
          </section>
        </div>
      </div>
    </main>
  );
};

export default PackBus;
