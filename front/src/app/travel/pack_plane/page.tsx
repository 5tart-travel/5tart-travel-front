'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IPlaneTour } from '@/interface/IPlaneTuor';



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
    router.push(`/travel/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-500 font-bold mb-4 text-center">Pack Avión</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-6 items-center">
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Destino</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Fecha Ingreso</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Fecha Egreso</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Precio</p>
      </div>
      <div className="space-y-4">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg overflow-hidden p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleCardClick(bus.id)}
          >
            <div className="grid grid-cols-6 items-center">
              <div className="text-gray-500">{bus.destino}</div>
              <div className="text-gray-500">{new Date(bus.fecha_ingreso).toLocaleDateString()}</div>
              <div className="text-gray-500">{new Date(bus.fecha_egreso).toLocaleDateString()}</div>
              <div className="text-blue-500 font-bold">{`$${bus.price}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackPlane;

