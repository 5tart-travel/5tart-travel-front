// import Image from 'next/image';
// import React from 'react';

// const TravelAgencyCarousel: React.FC = () => {

//     // remplazar esto por la peticion correspondiete
//   const agencies = [
//     { name: 'Aerolinea 1', image: 'https://via.placeholder.com/200', link: '/agencies/aerolinea1' },
//     { name: 'Aerolinea 1', image: 'https://via.placeholder.com/200', link: '/agencies/aerolinea1' },
//     { name: 'Aerolinea 1', image: 'https://via.placeholder.com/200', link: '/agencies/aerolinea1' },
//     { name: 'Aerolinea 2', image: 'https://via.placeholder.com/200', link: '/agencies/aerolinea2' },
//     { name: 'Aerolinea 2', image: 'https://via.placeholder.com/200', link: '/agencies/aerolinea2' },
//     { name: 'Bus 1', image: 'https://via.placeholder.com/200', link: '/agencies/bus1' },
//     { name: 'Bus 1', image: 'https://via.placeholder.com/200', link: '/agencies/bus1' },
//     { name: 'Bus 1', image: 'https://via.placeholder.com/200', link: '/agencies/bus1' },
//     { name: 'Bus 1', image: 'https://via.placeholder.com/200', link: '/agencies/bus1' },
//     { name: 'Bus 2', image: 'https://via.placeholder.com/200', link: '/agencies/bus2' },
//     // Añade más agencias según sea necesario
//   ];

//   return (
//     <div className="overflow-hidden">
//       <div className="flex space-x-4 animate-marquee">
//         {agencies.map((agency, index) => (
//           <div key={index} className="w-36 h-36 flex-shrink-0">
//             <a href={agency.link} target="_blank" rel="noopener noreferrer">
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl shadow-lg">
//                 <Image src={agency.image} alt={agency.name} className="w-full h-full object-cover rounded-xl"  width={500} height={500} />
//               </div>
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TravelAgencyCarousel;
