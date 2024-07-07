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

  const regions = [...new Set(tours.map(tour => tour.region))]; // Obtener regiones únicas



  const closeModal = () => {
    setSelectedRegion(null);
  };
  const openRegionModal = (region: string) => {
    const toursInRegion = tours.filter(tour => tour.region === region && tour.agency.id === params.id);
    if (toursInRegion.length > 0) {
      setSelectedRegion(region);
    }
  };

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

            <div className="p-4 bg-black rounded-lg opacity-80 text-white">
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
                  {regions.map(region => (
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

      {/* Sección de Tours en Avión */}
      {planeTours.length > 0 && (
        <div>
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

      {/* Sección de Tours en Bus */}
      {busTours.length > 0 && (
        <div>
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

      {/* Modal de Tours por Región */}
      {selectedRegion && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-md max-w-5xl w-full mx-auto max-h-screen overflow-y-auto relative">
            <button className="absolute top-2 right-2 mt-2 mr-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M13.293 6.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L10 12.586l3.293-3.293z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Tours en {selectedRegion}</h2>
              <div className="grid grid-cols-2 gap-4">
                {tours.filter(tour => tour.region === selectedRegion && tour.agency.id === params.id).map(tour => (
                  <Link key={tour.id} href={`/travel/${tour.transportType === 'plane' ? 'pack_plane' : 'pack_bus'}/${tour.id}`}>
                    <div className="max-w-xs mx-auto mb-4">
                      <TourCard tour={tour} onClick={function (id: string): void {
                        throw new Error('Function not implemented.');
                      }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyDetail;

