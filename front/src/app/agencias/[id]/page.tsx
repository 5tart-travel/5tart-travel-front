'use client'
import React, { useEffect, useState } from 'react';
import { IAgencias } from '@/interface/IAgencias';
import { IBusTour } from '@/interface/IBusTour';
import './AgencyDetails.css';
import Spiner from '@/components/ui/Spiner';
import ImageAgency from '../section/imageAgency';
import TourCard from '@/app/ofertas/tourCard';
import ContactoSection from '../section/contactoSection';
import MapsAgencia from '../section/mapsagencia';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

const AgencyDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [agencyDetails, setAgencyDetails] = useState<IAgencias | null>(null);
  const [tours, setTours] = useState<IBusTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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

  useEffect(() => {
    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('bg-gray-800')) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeClose);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeModal = () => {
    setSelectedRegion(null);
  };

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

  const regions = [...new Set(tours.map(tour => tour.region))]; 
  const openRegionModal = (region: string) => {
    const toursInRegion = tours.filter(tour => tour.region === region && tour.agency.id === params.id);
    if (toursInRegion.length > 0) {
      setSelectedRegion(region);
    }
  };

  function hasToursInRegion(region: string): boolean {
    const toursInRegion = tours.filter(tour => tour.region === region && tour.agency.id === params.id);
    return toursInRegion.length > 0;
  }
  

  return (
    <div className="relative">
      <div>
        <ImageAgency
          imgUrl={agencyDetails.imgUrl}
          name_agency={agencyDetails.name_agency}
        />
      </div>

      <ContactoSection agencyDetails={agencyDetails} />
      <div className="">

        <div className="mt-32 mx-auto max-w-6xl" style={{ width: '95%' }}>

          <div className="grid grid-cols-2 gap-10">

          <div className="p-4 bg-black bg-opacity-60 rounded-lg text-white">
              <MapsAgencia address={agencyDetails.address} />
            </div>

            <div className="p-4 bg-red rounded-lg opacity-80 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center"> QUIENES SOMOS</h2>
              <p>Somos {agencyDetails.name_agency}, ubicados en {agencyDetails.address}, Buenos Aires. Somos tu puerta de entrada a experiencias inolvidables en el corazón de Argentina. Nuestro compromiso es ofrecerte los destinos más emocionantes y seguros, combinando naturaleza, cultura y aventura en cada uno de nuestros tours.</p>
              <p>Operamos en todo el país, desde los picos nevados de la Patagonia hasta las cálidas aguas del Litoral. Descubre con nosotros la diversidad de paisajes y actividades que Argentina tiene para ofrecer.</p>
              <p>¡Déjate llevar por Turismo Aventura Argentina y vive una experiencia única en cada viaje!</p>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2 text-center">Regiones de Tours</h3>
                <div className="grid grid-cols-2 gap-4">
                  {regions
                    .filter(region => hasToursInRegion(region))
                    .map(region => (
                      <div key={region} className="cursor-pointer" onClick={() => openRegionModal(region)}>
                        <div className="p-2 bg-white rounded-lg shadow-md">
                          <h4 className="text-md font-semibold text-center">{region}</h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {planeTours.length > 0 && (
        <div className="mx-10">
          <div className="flex items-center mb-1 mt-16 mr-10 w-94">
            <hr className="border-gray-300 flex-grow opacity-20" />
            <h2 className="text-lg font-bold text-gray-300 mx-2">Paquetes Disponibles en Avión</h2>
            <hr className="border-gray-300 flex-grow opacity-20" />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 tour-card-container">
            {planeTours.map(tour => (
              <Link href={`/travel/pack_plane/${tour.id}`} key={tour.id}>
                <TourCard key={tour.id} tour={tour} onClick={() => console.log(tour.id)} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {busTours.length > 0 && (
        <div className="mx-10">
          <div className="flex items-center mb-1 mt-6">
            <hr className="border-gray-300 flex-grow opacity-20" />
            <h2 className="text-lg font-bold text-gray-300 mx-2">Paquetes disponibles en Bus</h2>
            <hr className="border-gray-300 flex-grow opacity-20" />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 tour-card-container">
            {busTours.map(tour => (
              <Link href={`/travel/pack_bus/${tour.id}`} key={tour.id}>
                <TourCard key={tour.id} tour={tour} onClick={() => console.log(tour.id)} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {selectedRegion && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 z-50 flex justify-center items-center mb-20"style={{ zIndex: 1000 }}>
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl relative">
            <h2 className="text-2xl font-bold mb-4 text-center">Región {selectedRegion}</h2>
            <div className="overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {tours
                  .filter(tour => tour.region === selectedRegion && tour.agency.id === params.id)
                  .map(tour => (
                    <Link href={`/travel/pack_bus/${tour.id}`} key={tour.id}>
                      <TourCard key={tour.id} tour={tour} onClick={() => console.log(tour.id)} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}





      {error && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 z-50 flex justify-center items-center">
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Error</h2>
            <p className="text-center">{error}</p>
            <button
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => setError(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
       <div className="flex justify-center mb-16">
        <Link href={'/travel/pack_bus'}>
          <BackButton />
        </Link>
      </div>
      
    </div>

   
  );
};

export default AgencyDetail;