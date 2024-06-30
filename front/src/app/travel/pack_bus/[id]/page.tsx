'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IBusTour } from '@/interface/IBusTour';
import { format } from 'date-fns'; // Importar la librería date-fns
import { es } from 'date-fns/locale'; // Importar el locale en español
import './BusDetail.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const BusDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [busDetails, setBusDetails] = useState<IBusTour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`https://fivetart-travel.onrender.com/tours/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: IBusTour = await response.json();
        console.log('Fetched data:', data);
        setBusDetails(data);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!busDetails) {
    return <p>No se encontraron detalles del tour.</p>;
  }

  // Formatear las fechas
  const formattedFechaIngreso = format(new Date(busDetails.fecha_ingreso), 'dd/MM/yyyy', { locale: es });
  const formattedFechaEgreso = format(new Date(busDetails.fecha_egreso), 'dd/MM/yyyy', { locale: es });
  const formattedFechaSalida = format(new Date(busDetails.date), 'dd/MM/yyyy', { locale: es });

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-2xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            {busDetails.oferta && (
              <div className="ribbon ribbon-top-right text-center"><span>Oferta</span></div>
            )}
            <Image src={busDetails.imgUrl} alt={busDetails.title} className="rounded-lg w-full" width={300} height={200} />
            <Image src="https://res.cloudinary.com/dia2gautk/image/upload/v1719724972/sxettsiexymytbh3eakg.jpg" alt={busDetails.title} className="rounded-lg w-full mt-5" width={300} height={200} />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">{busDetails.title}</h2>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Fecha de ingreso:</span> {formattedFechaIngreso}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Fecha de egreso:</span> {formattedFechaEgreso}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Agencia:</span> {busDetails.agency.name_agency}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Alojamiento:</span> {busDetails.hotel}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Precio por persona:</span>$ {busDetails.price}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Descripción:</span> {busDetails.description}</p>
            </div>
            <div className="mt-4">
              <button className="bg-blue-400 text-white px-4 py-2 rounded-lg w-full">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetail;
