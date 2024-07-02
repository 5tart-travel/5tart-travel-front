'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IBusTour } from '@/interface/IBusTour';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './BusDetail.css';
import AgenciaGeolocation from '@/components/Maps/TourGeolocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBroom, faBus, faChain, faChair, faExchangeAlt, faParking, faPlaneDeparture, faSnowflake, faSwimmer, faT, faToilet, faTv, faUserShield, faUtensils, faWheelchairAlt, faWifi } from '@fortawesome/free-solid-svg-icons';

const BusDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [busDetails, setBusDetails] = useState<IBusTour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  interface TouristPoint {
    name: string;
    // Otros campos necesarios
  }
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

  const formattedFechaIngreso = format(new Date(busDetails.fecha_ingreso), 'dd/MM/yyyy', { locale: es });
  const formattedFechaEgreso = format(new Date(busDetails.fecha_egreso), 'dd/MM/yyyy', { locale: es });

  { /*return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-2xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            {busDetails.oferta && (
              <div className="ribbon ribbon-top-right text-center"><span>Oferta</span></div>
            )}
            <Image src={busDetails.imgUrl} alt={busDetails.title} className="rounded-lg w-full" width={300} height={200} />
            {/* <Image src="https://res.cloudinary.com/dia2gautk/image/upload/v1719724972/sxettsiexymytbh3eakg.jpg" alt={busDetails.title} className="rounded-lg w-full mt-5" width={300} height={200} /> */}
  /* {busDetails.agency && (
<AgenciaGeolocation lat={busDetails.lat} lon={busDetails.lon} displayName={busDetails.display_name} touristPoints={busDetails.touristPoints} />
)}

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
     <p className="text-base"><span className='font-bold'>Precio por persona:</span> ${busDetails.price}</p>
     <hr className="my-2"/>
     <p className="text-base"><span className='font-bold'>Descripción:</span> {busDetails.description}</p>
     <hr className="my-2"/>
     <p className="text-base"><span className='font-bold'>pack turistico:</span> {busDetails.touristPoints.name}</p>
  
   </div>
   <div className="mt-4">
     <button className="bg-blue-400 text-white px-4 py-2 rounded-lg w-full">Comprar</button>
   </div>
 </div>
</div>
</div>
</div>
);
}}*/
  const getTransportIcon = () => {
    if (busDetails.transportType === 'bus') {
      return <FontAwesomeIcon icon={faBus} className="text-gray-500" />;
    } else {
      return <FontAwesomeIcon icon={faPlaneDeparture} className="text-gray-500" />;
    }
  };

  return (
    <div>
      <section className="text-base text-center mb-4">
        <div
          className="relative w-full sm:w-3/4 lg:w-3/4 mx-auto mt-8 rounded-lg overflow-hidden"
          style={{
            height: '500px',
            width: '95%'
          }}
        >
          <Image
            src={busDetails.imgUrl}
            alt={busDetails.title}
            layout="fill"
            objectFit="cover"
            quality={100} // Ajusta la calidad de la imagen
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
            <h1 className="text-white text-4xl mb-4 text-left">{busDetails.title}</h1>
            <p className="text-white text-lg text-left">{busDetails.description}</p>
          </div>
        </div>
      </section>
  
  
      <section className="text-base flex items-center mt-20">
  
        <div className="w-1/2 pr-4 h-full">
          <div className="bg-gray-200 p-4 rounded-lg h-full flex flex-col items-center justify-center ml-10 text-center">
            <h2 className="text-xl font-bold uppercase mb-2">{busDetails.hotel}</h2>
            <img src={busDetails.imgUrl} alt={busDetails.hotel} className="w-full h-auto rounded-lg" />
          </div>
        </div>
  
  
  
        <div className="w-1/2 pl-4 h-full">
          <div className="bg-white p-4 rounded-lg flex flex-col justify-start items-center h-full">
  
            <div className="text-left">
              <div className="flex items-center mb-1">
                <hr className="border-gray-300 flex-grow opacity-20" />
                <h2 className="text-lg font-bold text-gray-300 mx-2">Diversión y ocio</h2>
                <hr className="border-gray-300 flex-grow opacity-20" />
              </div>
              <div>
                <p className="text-base"><strong><FontAwesomeIcon icon={faSwimmer} /> Piscina al aire libre de temporada</strong></p>
                <p className="text-base"><strong><FontAwesomeIcon icon={faTv} /> TV en zonas comunes</strong></p>
              </div>
  
              <div className="flex items-center mb-1">
                <hr className="border-gray-300 flex-grow opacity-20" />
                <h2 className="text-lg font-bold text-gray-300 mx-2">Alimentación</h2>
                <hr className="border-gray-300 flex-grow opacity-20" />
              </div>
              <div>
                <p className="text-base"><strong><FontAwesomeIcon icon={faChair} /> Desayuno</strong></p>
              </div>
  
              <div className="flex items-center mb-1">
                <hr className="border-gray-300 flex-grow opacity-20" />
                <h2 className="text-lg font-bold text-gray-300 mx-2">Estacionamiento y movilidad</h2>
                <hr className="border-gray-300 flex-grow opacity-20" />
              </div>
              <p className="text-base"><strong><FontAwesomeIcon icon={faParking} /> Estacionamiento gratis</strong></p>
  
              <div className="flex items-center mb-1">
                <hr className="border-gray-300 flex-grow opacity-20" />
                <h2 className="text-lg font-bold text-gray-300 mx-2">Seguridad</h2>
                <hr className="border-gray-300 flex-grow opacity-20" />
              </div>
              <p className="text-base"><strong><FontAwesomeIcon icon={faUserShield} /> Seguridad 24 hrs</strong></p>
  
              <div className="flex items-center mb-1">
                <hr className="border-gray-300 flex-grow opacity-20" />
                <h2 className="text-lg font-bold text-gray-300 mx-2">Información sobre accesibilidad</h2>
                <hr className="border-gray-300 flex-grow opacity-20" />
              </div>
              <p className="text-base"><strong><FontAwesomeIcon icon={faWheelchairAlt} /> Unidades adaptadas a personas con movilidad reducida</strong></p>
  
              <div className="flex items-center mb-1">
                <hr className="border-gray-300 flex-grow opacity-20" />
                <h2 className="text-lg font-bold text-gray-300 mx-2">Servicios en áreas comunes y habitación</h2>
                <hr className="border-gray-300 flex-grow opacity-20" />
              </div>
              <p className="text-base"><strong><FontAwesomeIcon icon={faSnowflake} /> Aire acondicionado y calefacción</strong></p>
              <p className="text-base"><strong><FontAwesomeIcon icon={faWifi} /> Wi-Fi y Internet por cable gratis</strong></p>
  
              <div className="flex items-center mb-1">
                <hr className="border-gray-300 flex-grow opacity-20" />
                <h2 className="text-lg font-bold text-gray-300 mx-2">Incluye</h2>
                <hr className="border-gray-300 flex-grow opacity-20" />
              </div>
              <p className="text-base"><strong><FontAwesomeIcon icon={faBroom} /> Servicio de cama</strong></p>
              <div className="text-left flex">
                <p className="mr-4"><strong><FontAwesomeIcon icon={faToilet} /> Baño privado</strong></p>
                <p><strong><FontAwesomeIcon icon={faBed} /> Cama Matrimonial</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section className="text-base flex items-center mt-5">
        <div
          className="relative w-full sm:w-3/4 lg:w-3/4 mx-auto rounded-lg overflow-hidden"
          style={{
            height: '300px',
            width: '95%'
          }}
        >
          {busDetails.agency && (
            <>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <AgenciaGeolocation
                  lat={busDetails.lat}
                  lon={busDetails.lon}
                  displayName={busDetails.display_name}
                  touristPoints={busDetails.touristPoints}
                />
              </div>
              <div
                className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-red-600 p-3"
                style={{
                  zIndex: 10,
                  textAlign: 'left',
                }}
              >
                <p>Ubicación del hotel</p>
              </div>
            </>
          )}
        </div>
      </section>
      {busDetails.touristPoints && busDetails.touristPoints.length > 0 && (
        <section>
          <div className="flex items-center mb-1 mt-10">
            <hr className="border-gray-300 flex-grow opacity-20" />
            <h2 className="text-lg font-bold text-gray-300 mx-2">Qué hacer en </h2>
            <span className="text-lg font-bold text-gray-300 opacity-23">{busDetails.destino.toUpperCase()}</span>
            <hr className="border-gray-300 flex-grow opacity-20" />
          </div>
  
          <div className="mt-4 ml-10 grid grid-cols-3 gap-4">
            {busDetails.touristPoints.map((point, index) => (
              <div key={index} className="text-base text-gray-500">
                {/* ⭐ {point.name} */}
              </div>
            ))}
          </div>
        </section>
      )}
  
  
      <div className="flex items-center mb-1 mt-20">
        <hr className="border-gray-300 flex-grow opacity-20" />
        <h2 className="text-lg font-bold text-gray-300 mx-2">Detalle de </h2>
        <span className="text-lg font-bold text-gray-300 opacity-23">{busDetails.transportType.toUpperCase()}</span>
        <hr className="border-gray-300 flex-grow opacity-20" />
      </div>
      <section className="text-base mt-8 mt-5">
        <div className="flex justify-between items-start max-w-6xl mx-auto text-center">
  
          <div className="flex-1 bg-gray-100 p-4 rounded-lg mr-8">
            <div className="flex items-center mb-6 justify-center">
              <div className="mr-3">
                {getTransportIcon()}
              </div>
              <div className="font-bold text-2xl">Ida</div>
            </div>
  
            <div className="mb-6">
              <span className="font-bold text-lg">Fecha de salida:</span> {formattedFechaIngreso}
            </div>
            <div className="mb-6">
              <span className="font-bold text-lg">Origen:</span> {busDetails.salida.toUpperCase()}
            </div>
            <div className="mb-6">
              <span className="font-bold text-lg">Empresa:</span> {busDetails.empresa.toUpperCase()}
            </div>
          </div>
  
  
          <div className="flex items-center justify-center mt-20">
            <FontAwesomeIcon icon={faExchangeAlt} className="text-gray-500 text-4xl mt-4" />
          </div>
  
          <div className="flex-1 bg-gray-100 p-4 rounded-lg ml-8">
            <div className="flex items-center mb-6 justify-center">
              <div className="mr-3">
                {getTransportIcon()}
              </div>
              <div className="font-bold text-2xl">Vuelta</div>
            </div>
            <div className="mb-6">
              <span className="font-bold text-lg">Fecha de llegada:</span> {formattedFechaEgreso}
            </div>
            <div className="mb-6">
              <span className="font-bold text-lg">Destino:</span> {busDetails.destino.toUpperCase()}
            </div>
            <div className="mb-6">
              <span className="font-bold text-lg">Empresa:</span> {busDetails.empresa.toUpperCase()}
            </div>
          </div>
        </div>
      </section>
  
      
    </div>
  );
  
}

export default BusDetail;
