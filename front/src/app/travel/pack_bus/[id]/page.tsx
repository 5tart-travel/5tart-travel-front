'use client'
import React, { useEffect, useState } from 'react';
import { IBusTour, ITourisPoints, IComments } from '@/interface/IBusTour';
import './BusDetail.css';
import Pasage from './sections/Passage';
import TourDetails from './sections/tourDetail';
import OpinionSection from './sections/opinion';
import BusImageSection from './sections/image';
import MapSection from './sections/mapaSection';
import TouristPointsSection from './sections/turispoint';
import CompraSection from './sections/comprarsection';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

const BusDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [busDetails, setBusDetails] = useState<IBusTour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: IBusTour = await response.json();
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

  return (
    <div className="relative">
      <div>
        <BusImageSection
          imgUrl={busDetails.imgUrl}
          title={busDetails.title}
          description={busDetails.description}
        />
      </div>

      <CompraSection tourId={params.id}  busDetails={busDetails} />
      <div>
        <TourDetails busDetails={busDetails} />
      </div>

      <MapSection busDetails={busDetails} />

      <TouristPointsSection busDetails={busDetails} />

      <div className="flex items-center mb-1 mt-20">
        <hr className="border-gray-300 flex-grow opacity-20" />
        <h2 className="text-lg font-bold text-gray-300 mx-2">Detalle de</h2>
        <span className="text-lg font-bold text-gray-300 opacity-23">{busDetails.transportType.toUpperCase()}</span>
        <hr className="border-gray-300 flex-grow opacity-20" />
      </div>
      <div>
        <Pasage busDetails={busDetails} />
      </div>

      <div className="flex items-center mb-1 mt-20">
        <hr className="border-gray-300 flex-grow opacity-20" />
        <h2 className="text-lg font-bold text-gray-300 mx-2">Comentarios</h2>
        <hr className="border-gray-300 flex-grow opacity-20" />
      </div>

      <div className="w-full p-10">
        <div className="bg-gray-200 rounded-md p-5">
          {busDetails && (
            <OpinionSection
              tourId={params.id}
              comments={busDetails.comments.map(comment => ({
                ... comment,
                tourId: params.id 
                }))}
            />
          )}
        </div>
      </div>
      <div className='flex justify-center mb-16'>
            <Link href={'/travel/pack_bus'}>
             <BackButton />
            </Link>
       
        </div>
    </div>
  );
};

export default BusDetail;