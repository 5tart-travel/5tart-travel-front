// 'use client';
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { IAgencias } from '@/interface/IAgencias';
// import './AgencyDetails.css';
// import dynamic from 'next/dynamic';

// const AgenciaGeolocation = dynamic(() => import('@/components/Maps/TourGeolocation'), {
//   ssr: false,
// });

// const AgencyDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
//   const [agencyDetails, setAgencyDetails] = useState<IAgencias | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   useEffect(() => {
//     const fetchAgencyDetails = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/${params.id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           const errorText = await response.text();
//           console.error('Unexpected response:', errorText);
//           throw new Error('Expected JSON but received HTML');
//         }
//         const data: IAgencias = await response.json();
//         setAgencyDetails(data);
//       } catch (error: any) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgencyDetails();
//   }, [params.id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!agencyDetails) {
//     return <p>No se encontraron detalles de la agencia.</p>;
//   }

//   return (
//     <div className="container mx-auto p-4 flex justify-center">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-2xl relative">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="flex flex-col relative">
//             {agencyDetails.oferta && (
//               <div className="ribbon ribbon-top-right text-center"><span>Oferta</span></div>
//             )}
//             <Image src={agencyDetails.imgUrl} alt={agencyDetails.name_agency} className="rounded-lg w-full" width={300} height={200} />
//             {agencyDetails.lat && agencyDetails.lon && agencyDetails.display_name && (
//               <AgenciaGeolocation
//                 lat={agencyDetails.lat}
//                 lon={agencyDetails.lon}
//                 displayName={agencyDetails.display_name}
//                 touristPoints={agencyDetails.touristPoints || []}
//               />
//             )}
//           </div>
//           <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
//             <div>
//               <h2 className="text-xl font-bold mb-4">{agencyDetails.name_agency}</h2>
//               <hr className="my-2"/>
//               <p className="text-base"><span className='font-bold'>Email:</span> {agencyDetails.mail}</p>
//               <hr className="my-2"/>
//               <p className="text-base"><span className='font-bold'>Dirección:</span> {agencyDetails.address}</p>
//               <hr className="my-2"/>
//               <p className="text-base"><span className='font-bold'>Descripción:</span> {agencyDetails.description}</p>
//               <hr className="my-2"/>
//               <p className="text-base"><span className='font-bold'>Teléfono:</span> {agencyDetails.phone}</p>
//             </div>
//             <div className="mt-4">
//               <button className="bg-blue-400 text-white px-4 py-2 rounded-lg w-full">Contactar</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgencyDetail;

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IAgencias } from '@/interface/IAgencias';
import './AgencyDetails.css';
import dynamic from 'next/dynamic';
import airplaneImage from '@/public/avion404.png'; // Importa la imagen del avión
import Link from 'next/link';
import Spiner from '@/components/ui/Spiner';

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
        <div className="bg-gray-100  rounded-lg overflow-hidden p-4 w-full h-[400px] max-w-2xl relative shadow-2xl ">
          <div className="airplane"></div> {/* Aquí se coloca la animación del avión */}
          <h2 className=" flex justify-center text-gray-600 mt-[100px] text-3xl font-bold mb-4">Página en desarrollo</h2>
          <p className=' flex justify-center text-gray-600' >Esta página está actualmente en desarrollo. Por favor, vuelve más tarde.</p>
          <Link href={'/'}>
        <h1 className=" flex justify-center text-orange-600 hover:text-orange-500 mt-[100px] text-3xl font-bold mb-4 cursor-pointer  "  > GO BACK</h1>
      </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-2xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            {agencyDetails.oferta && (
              <div className="ribbon ribbon-top-right text-center"><span>Oferta</span></div>
            )}
            <Image src={agencyDetails.imgUrl} alt={agencyDetails.name_agency} className="rounded-lg w-full" width={300} height={200} />
            {agencyDetails.lat && agencyDetails.lon && agencyDetails.display_name && (
              <AgenciaGeolocation
                lat={agencyDetails.lat}
                lon={agencyDetails.lon}
                displayName={agencyDetails.display_name}
                touristPoints={agencyDetails.touristPoints || []}
              />
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">{agencyDetails.name_agency}</h2>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Email:</span> {agencyDetails.mail}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Dirección:</span> {agencyDetails.address}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Descripción:</span> {agencyDetails.description}</p>
              <hr className="my-2"/>
              <p className="text-base"><span className='font-bold'>Teléfono:</span> {agencyDetails.phone}</p>
            </div>
            <div className="mt-4">
              <button className="bg-blue-400 text-white px-4 py-2 rounded-lg w-full">Contactar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyDetail;
