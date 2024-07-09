'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IBusTour } from '@/interface/IBusTour';
import TourCard from '@/app/ofertas/tourCard';
import FilterComponent from '@/components/FiltrosPack/FilterComponent';

const PackBus: React.FC = () => {
  const router = useRouter();
  const [buses, setBuses] = useState<IBusTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTours, setFilteredTours] = useState<IBusTour[]>([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tours/plane`,
        );
        if (!response.ok) {
          throw new Error('Falló el fetch de bus tours');
        }
        const data: IBusTour[] = await response.json();
        setBuses(data);
        setFilteredTours(data);
      } catch (err) {
        setError('Error fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  useEffect(() => {
    setNoResults(filteredTours.length === 0);
  }, [filteredTours]);

  const handleCardClick = (id: string) => {
    router.push(`/travel/pack_bus/${id}`);
  };

  return (
    <main className="flex bg-gray-100 min-h-screen bg-black">
      <aside className="w-1/4 p-4 border-r border-gray-200 text-gray-500 ">
        <FilterComponent buses={buses} setFilteredTours={setFilteredTours} />
      </aside>
      <div className="flex flex-col items-center p-4 w-full bg-gray-100">
        <div className="max-w-6xl w-full flex bg-white rounded-md shadow-md">
          <section className="p-4">
            {noResults ? (
              <section className="max-w-6xl w-full mb-8">
                <h2 className="text-xl font-bold text-center ">
                  No se encontraron tours según los filtros aplicados
                </h2>
              </section>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {filteredTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default PackBus;

// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import TourCard from '@/app/ofertas/tourCard';
// import Link from 'next/link';
// import BackButton from '@/components/ui/BackButton';
// import { IBusTour } from '@/interface/IBusTour';

// const PackPlane: React.FC = () => {
//   const router = useRouter();
//   const [buses, setBuses] = useState<IBusTour[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/tours/plane`,
//         );
//         if (!response.ok) {
//           throw new Error('Falló el  fetch de plane tours');
//         }
//         const data: IBusTour[] = await response.json();
//         setBuses(data);
//       } catch (err) {
//         setError('Error fetch data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBuses();
//   }, []);

//   const handleCardClick = (id: string) => {
//     router.push(`/travel/pack_plane/${id}`);
//   };

//   const groupedTours = buses.reduce((acc, tour) => {
//     const { region } = tour;
//     if (!acc[region]) {
//       acc[region] = [];
//     }
//     acc[region].push(tour);
//     return acc;
//   }, {} as Record<string, IBusTour[]>);

//   const regions = [
//     'Patagonia',
//     'Noroeste',
//     'Cuyo',
//     'Pampeana',
//     'Litoral',
//     'Internacional',
//   ];

//   return (
//     <main className="bg-gray-50 flex flex-col items-center p-4">
//       <section className="max-w-6xl w-full mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
//           Paquetes en Avión
//         </h1>
//         <p className="text-lg text-gray-600 mb-4 text-center">
//           Explora los mejores paquetes turísticos Aéreos, Nacionales e
//           Internacionales!!
//         </p>
//       </section>

//       <section className="max-w-6xl w-full mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {regions.map((region, index) => {
//           if (groupedTours[region]) {
//             return (
//               <Link
//                 href={`#${region.toLowerCase().replace(/\s/g, '-')}`}
//                 key={`${region}-${index}`}
//               >
//                 <div className="relative bg-white rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
//                   <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden">
//                     <Image
//                       src={`/images/${region.toLowerCase()}.jpg`}
//                       alt={region}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-lg"
//                     />
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <h3 className="text-lg font-semibold italic text-white bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg">
//                       {region}
//                     </h3>
//                   </div>
//                 </div>
//               </Link>
//             );
//           } else {
//             return null;
//           }
//         })}
//       </section>

//       {/* <section className="max-w-6xl w-full mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {regions.map((region) => {
//           if (groupedTours[region]) {
//             return (
//               <Link href={`#${region.toLowerCase().replace(/\s/g, '-')}`}>

//                 <div className="relative bg-white rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
//                   <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden">
//                     <Image
//                       src={`/images/${region.toLowerCase()}.jpg`}
//                       alt={region}
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-lg"
//                     />
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <h3 className="text-lg font-semibold italic text-white bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg">
//                       {region}
//                     </h3>
//                   </div>
//                 </div>

//             </Link>
//             );
//           } else {
//             return null;
//           }
//         })}
//       </section> */}

//       <section className="max-w-6xl w-full mb-8">
//         <div className="flex items-center justify-center mb-4">
//           <hr className="border-gray-300 flex-grow opacity-20" />
//           <h2 className="text-2xl font-bold border-gray-300 mx-4 opacity-40 my-4">
//             Filtros
//           </h2>
//           <hr className="border-gray-300 flex-grow opacity-20" />
//         </div>
//       </section>

//       <div className="w-full max-w-6xl mx-auto">
//         {Object.keys(groupedTours).map((region) => (
//           <div
//             key={region}
//             className="mb-8"
//             id={region.toLowerCase().replace(/\s/g, '-')}
//           >
//             <div className="flex items-center justify-center mb-4">
//               <hr className="border-gray-300 flex-grow opacity-20" />
//               <h2 className="text-2xl font-bold border-gray-300 mx-4 opacity-40 my-4">
//                 {region}
//               </h2>
//               <hr className="border-gray-300 flex-grow opacity-20" />
//             </div>
//             <div className="flex justify-center">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {groupedTours[region].map((tour) => (
//                   <TourCard
//                     key={tour.id}
//                     tour={tour}
//                     onClick={handleCardClick}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mb-16">
//         <Link href={'/travel'}>
//           <BackButton />
//         </Link>
//       </div>
//     </main>
//   );
// };

// export default PackPlane;
