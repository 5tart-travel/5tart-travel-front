'use client'
import React, { useEffect, useState } from 'react';
import { IAgencias } from '@/interface/IAgencias';
import { IBusTour } from '@/interface/IBusTour';
import './AgencyDetails.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Spiner from '@/components/ui/Spiner';
import ImageAgency from '../section/imageAgency';
import TourCard from '@/app/ofertas/tourCard';
import ContactoSection from '../section/contactoSection';
import MapsAgencia from '../section/mapsagencia';

const AgenciaGeolocation = dynamic(() => import('@/components/Maps/TourGeolocation'), {
  ssr: false,
});

const AgencyDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [agencyDetails, setAgencyDetails] = useState<IAgencias | null>(null);
  const [tours, setTours] = useState<IBusTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const errorText = await response.text();
          console.error('Unexpected response:', errorText);
          throw new Error('Expected JSON but received HTML');
        }
        const data: IAgencias = await response.json();
        setAgencyDetails(data);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTours = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours`);
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const errorText = await response.text();
          console.error('Unexpected response:', errorText);
          throw new Error('Expected JSON but received HTML');
        }
        const data: IBusTour[] = await response.json();
        setTours(data);
      } catch (error: any) {
        console.error('Error fetching tours:', error);
        setError(error.message);
      }
    };

    fetchAgencyDetails();
    fetchTours();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-2xl relative">
          <div className="airplane"></div>
          <Spiner />
        </div>
      </div>
    );
  }

  if (!agencyDetails) {
    return null; 
  }

  const planeTours = tours.filter(tour => tour.agency.id === params.id && tour.transportType === 'plane');
  const busTours = tours.filter(tour => tour.agency.id === params.id && tour.transportType === 'bus');

  return (
    <div className="relative">
       

      <div>
        <ImageAgency
          imgUrl={agencyDetails.imgUrl}
          name_agency={agencyDetails.name_agency}
        />
      </div>
      <ContactoSection agencyDetails={agencyDetails} />
      
      {planeTours.length > 0 && (
        <div>
          <div className="flex items-center mb-1 mt-20 mr-10 w-94">
            <hr className="border-gray-300 flex-grow opacity-20" />
            <h2 className="text-lg font-bold text-gray-300 mx-2">Paquetes Disponibles en Avión</h2>
            <hr className="border-gray-300 flex-grow opacity-20" />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 tour-card-container">
            {planeTours.map(tour => (
              <TourCard key={tour.id} tour={tour} onClick={() => console.log(tour.id)} />
            ))}
          </div>
        </div>
      )}

      {busTours.length > 0 && (
        <div>
          <div className="flex items-center mb-1 mt-20">
            <hr className="border-gray-300 flex-grow opacity-20" />
            <h2 className="text-lg font-bold text-gray-300 mx-2">Paquetes disponibles en Bus</h2>
            <hr className="border-gray-300 flex-grow opacity-20" />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 tour-card-container">
            {busTours.map(tour => (
              <TourCard key={tour.id} tour={tour} onClick={() => console.log(tour.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyDetail;
