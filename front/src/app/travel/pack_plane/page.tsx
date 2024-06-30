'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IPlaneTour } from '@/interface/IPlaneTuor';
import TourCard from '@/app/ofertas/tourCard';
import { Link } from 'phosphor-react';



const PackPlane: React.FC = () => {
  const router = useRouter();
  const [buses, setBuses] = useState<IPlaneTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('https://fivetart-travel.onrender.com/tours/plane');
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
    'Norte',
    'Litoral'
  ];
 
  return (
    <main className='bg-gray-50 flex flex-col items-center p-4'>
      <section className="max-w-6xl w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Paquetes en Avion</h1>
        <p className="text-lg text-gray-600 mb-4 text-center">Explora los mejores paquetes turísticos Aereos, Nacionales e Internacionales!!</p>
      </section>


      <section className="max-w-6xl w-full mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {regions.map((region) => (
        <Link key={region} href={`#${region.toLowerCase()}`}>
          <a>
            <div className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform duration-300">
              <img
                src={`/images/${region.toLowerCase()}.jpg`}
                alt={region}
                className="w-full h-auto rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">{region}</h3>
            </div>
          </a>
        </Link>
      ))}
    </section>

      
      <div className="w-full max-w-6xl">
        {Object.keys(groupedTours).map((region) => (
          <div key={region} className="mb-8" id={region}>
            <div className="flex items-center justify-center mb-4">
              <hr className="border-gray-300 flex-grow opacity-20" />
              <h2 className="text-2xl font-bold border-gray-300 mx-4">{region}</h2>
              <hr className="border-gray-300 flex-grow opacity-20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedTours[region].map((tour) => (
                <TourCard key={tour.id} tour={tour} onClick={handleCardClick}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>



  );

  };



export default PackPlane;

