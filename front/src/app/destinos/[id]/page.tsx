// // pages/destination/[id].tsx
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// const Destination: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [destination, setDestination] = useState(null);

//   useEffect(() => {
//     if (id) {
//       // Simulando una petición a una API
//       const fetchDestination = async () => {
//         const response = await fetch(`/api/destinations/${id}`);
//         const data = await response.json();
//         setDestination(data);
//       };

//       fetchDestination();
//     }
//   }, [id]);

//   if (!destination) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//         <h1>DETALLE DEL DESTINO </h1>
//       {/* <h1 className="text-3xl font-bold mb-4">{destination.destinationName}</h1> */}
//       {/* Aquí puedes renderizar la información de las agencias de viajes */}
//     </div>
//   );
// };

// export default Destination;
