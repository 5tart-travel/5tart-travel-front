'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IAgencias } from '@/interface/IAgencias';
import './AgencyDetails.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Spiner from '@/components/ui/Spiner';
import MapSection from '@/app/travel/pack_bus/[id]/sections/mapaSection';
import BackButton from '@/components/ui/BackButton';
import PackageDetails from '@/app/travel/pack_bus/[id]/sections/image';

const AgenciaGeolocation = dynamic(() => import('@/components/Maps/TourGeolocation'), {
  ssr: false,
});

const AgencyDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [agencyDetails, setAgencyDetails] = useState<IAgencias | null>(null);
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

    fetchAgencyDetails();
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
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <div className="bg-gray-100 rounded-lg overflow-hidden p-4 w-full h-[400px] max-w-2xl relative shadow-2xl">
          <div className="airplane"></div>
          <h2 className="flex justify-center text-gray-600 mt-[100px] text-3xl font-bold mb-4">Página en desarrollo</h2>
          <p className="flex justify-center text-gray-600">
            Esta página está actualmente en desarrollo. Por favor, vuelve más tarde.
          </p>
          <Link href="/">
            <h1 className="flex justify-center text-orange-600 hover:text-orange-500 mt-[100px] text-3xl font-bold mb-4 cursor-pointer">GO BACK</h1>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Aquí puedes colocar el contenido detallado de la agencia */}
      <div>
      <div>
        <PackageDetails
          imgUrl={agencyDetails.imgUrl}
          title={agencyDetails.name_agency}
          description={agencyDetails.description}
        />
      </div>
      </div>

      <div>
        {/* <MapSection agency={agencyDetails} /> */}
        
      </div>

      <div className="flex items-center mb-1 mt-20">
        <hr className="border-gray-300 flex-grow opacity-20" />
        <h2 className="text-lg font-bold text-gray-300 mx-2">Detalles de la agencia</h2>
        <span className="text-lg font-bold text-gray-300 opacity-23">{agencyDetails.name_agency.toUpperCase()}</span>
        <hr className="border-gray-300 flex-grow opacity-20" />
      </div>

      <div className="flex items-center mb-1 mt-20">
        <hr className="border-gray-300 flex-grow opacity-20" />
        <h2 className="text-lg font-bold text-gray-300 mx-2">Comentarios</h2>
        <hr className="border-gray-300 flex-grow opacity-20" />
      </div>

      <div className="w-full p-10">
        {/* Aquí puedes colocar contenido adicional o comentarios */}
      </div>

      <div className="flex justify-center mb-16">
        <Link href="/travel/pack_plane">
          <BackButton />
        </Link>
      </div>
    </div>
  );
};

export default AgencyDetail;
