'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IBusTour } from '@/interface/IBusTour';

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
      }
       finally {
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

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <Image src={busDetails.imgUrl} alt={busDetails.title} className="rounded-lg w-full" width={300} height={200} />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">{busDetails.destino}</h2>
              <hr className="my-2"/>
              <p className="text-base"><strong>Fecha de salida:</strong> {busDetails.date}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Fecha de ingreso:</strong> {busDetails.fecha_ingreso}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Agencia:</strong> {busDetails.agency.name_agency}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Precio por persona:</strong> {busDetails.price}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Precio por persona:</strong> {busDetails.description}</p>
            </div>
            <div className="mt-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg w-full">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetail;
