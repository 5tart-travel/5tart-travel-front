//? Aca va ir la logica para mercado pago y quizas paypal

'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const BusDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Datos hardcodeados para demostración
  const busDetails = {
    id: 1,
    destino: 'Mar del Plata',
    date: 'Mar. 30/07/2024',
    duration: '10 horas',
    type: 'directos',
    price: '$200.920',
    agency: 'Coppel',
    imageUrl: "https://via.placeholder.com/300x200",
    mapUrl: "https://via.placeholder.com/300x200", // Reemplaza con una URL de mapa real
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <Image src={busDetails.imageUrl} alt={busDetails.destino} className="rounded-lg w-full" width={300} height={200} />
            <Image src={busDetails.mapUrl} alt="Mapa del destino" className="rounded-lg w-full" width={300} height={200} />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">{busDetails.destino}</h2>
              <hr className="my-2"/>
              <p className="text-base"><strong>Fecha de salida:</strong> {busDetails.date}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Duración:</strong> {busDetails.duration}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Escalas:</strong> {busDetails.type}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Agencia:</strong> {busDetails.agency}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Precio por persona:</strong> {busDetails.price}</p>
              <hr className="my-2"/>
              <p className="text-base"><strong>Precio total:</strong> {busDetails.price}</p>
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
