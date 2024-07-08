'use client';
import React, { useEffect, useState } from 'react';
import { IBusTour } from '@/interface/IBusTour';
import './PlaneDetail.css';
import BusImageSection from '../../pack_bus/[id]/sections/image';
import TourDetails from '../../pack_bus/[id]/sections/tourDetail';
import MapSection from '../../pack_bus/[id]/sections/mapaSection';
import TouristPointsSection from '../../pack_bus/[id]/sections/turispoint';
import Pasage from '../../pack_bus/[id]/sections/Passage';
import OpinionSection from '../../pack_bus/[id]/sections/opinion';
import CompraSection from '../../pack_bus/[id]/sections/comprarsection';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

const PlaneDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
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
        // console.log('Fetched data:', data);
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

      <CompraSection busDetails={busDetails} tourId={params.id} />
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
                setBusDetails={setBusDetails}
            />
          )}
        </div>
      </div>
      <div className='flex justify-center mb-16'>
            <Link href={'/travel/pack_plane'}>
             <BackButton />
            </Link>
       
        </div>
    </div>
  );

}

export default PlaneDetail;
