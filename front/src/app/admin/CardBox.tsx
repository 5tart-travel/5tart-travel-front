
// 'use client';
// import socket from '@/hooks/useSocket';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { BsFillInboxesFill } from "react-icons/bs";

// // interface Notification {
// //   type: 'user' | 'agency';
// //   message: string;
// // }


// export interface Agency {
//   id: string;
//   name_agency: string;
// }

// const CardBox: React.FC = () => {
//     const [agencies, setAgencies] = useState<Agency[]>([]);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const response = await axios.get<Agency[]>('https://fivetart-travel-kafg.onrender.com/agency/disable');
//         setAgencies(response.data);
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       }
//     };

//     fetchInitialData();

//     socket.on('connect', () => {
//       console.log('Connected to server');
//       socket.emit('getAllItems');
//     });

//     socket.on('allDisableAgency', (items: Agency[]) => {
//       console.log('Received disabled agencies from server:', items);
//       setAgencies(items);
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('allDisableAgency');
//       socket.off('disconnect');
//     };
//   }, []);


   

  

//   return (
//     <div
//       className={`relative p-4 bg-white rounded-2xl shadow-2xl cursor-pointer w-60 h-full transition-all duration-500 custom-scrollbar overflow-y-auto`}
//     >
//       <div className="absolute top-2 left-2 bg-white rounded-full p-2">
//         <BsFillInboxesFill className="text-lime-700" size={24} />
//       </div>
//       <div className="absolute top-2 right-2 bg-white rounded-full p-2">
//         <BsFillInboxesFill className="text-cyan-500" size={24} />
//       </div>
//       <div className="flex flex-col items-center justify-center mt-4">
//         <p className="text-xl text-gray-600 font-semibold">Inbox</p>
//         <p className="text-3xl text-gray-600 font-bold">{agencies.length}</p>
//       </div>
//       <div className="mt-4 w-full">
//         {agencies.length > 0 ? (
//           agencies.map((notification) => (
//             <div key={notification.id} className="p-2 border-b border-gray-200 bg-white hover:bg-blue-100 text-gray-700 rounded-md shadow-md mb-2 overflow-hidden">
//               <p className="text-sm font-semibold truncate">Nueva agencia: {notification.name_agency} para activar</p>
//             </div>
//           ))
//         ) : (
//           <div className='flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl py-4 w-full' >
//              <p className="text-sm  text-gray-500">No hay notificaciones</p>
//           </div>
          
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardBox;
