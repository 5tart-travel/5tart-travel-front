// 'use client';
// import React, { useState } from 'react';

// interface CreateTourDto {
//   title: string;
//   price: number | null;
//   description: string;
//   imgUrl?: string;
//   address: string;
//   fecha_ingreso?: Date | null;
//   fecha_egreso?: Date | null;
//   destino?: string;
//   salida?: string;
//   oferta?: boolean;
//   transportType: string | '';
// }

// interface FormularioTourProps {
//   onClose: () => void;
//   onAddTour: (tour: CreateTourDto) => void;
// }

// const FormularioTour: React.FC<FormularioTourProps> = ({ onClose, onAddTour }) => {
//   const [title, setTitle] = useState('');
//   const [price, setPrice] = useState<number | null>(null);
//   const [description, setDescription] = useState('');
//   const [address, setAddress] = useState('');
//   const [fecha_ingreso, setFecha_ingreso] = useState<Date | null>(null);
//   const [fecha_egreso, setFecha_egreso] = useState<Date | null>(null);
//   const [destino, setDestino] = useState('');
//   const [salida, setSalida] = useState('');
//   const [transportType, setTransportType] = useState<string | ''>('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const userSessionString = localStorage.getItem('userSession');
//     if (!userSessionString) {
//       alert('No hay una sesión de usuario activa.');
//       return;
//     }
//     const userSession = JSON.parse(userSessionString);
//     const token = userSession.access_token;

//     if (title && price !== null && description && address && transportType) {
//       try {
//         const nuevoTour: CreateTourDto = {
//           title,
//           price,
//           description,
//           address,
//           fecha_ingreso: fecha_ingreso || undefined,
//           fecha_egreso: fecha_egreso || undefined,
//           destino: destino || undefined,
//           salida: salida || undefined,
//           transportType,
//         };

//         const tourResponse = await fetch('https://fivetart-travel.onrender.com/tours', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(nuevoTour),
//         });

//         if (!tourResponse.ok) {
//           throw new Error('Error al agregar el tour.');
//         }

//         onAddTour(nuevoTour);
//         alert('Tour agregado correctamente');
//         onClose();
//       } catch (error) {
//         console.error('Error:', error);
//         alert('Ocurrió un error al agregar el tour. Por favor, intente nuevamente.');
//       }
//     } else {
//       alert('Por favor complete todos los campos obligatorios.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-4">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//           Título
//         </label>
//         <input
//           id="title"
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//           Precio
//         </label>
//         <input
//           id="price"
//           type="number"
//           value={price !== null ? price : ''}
//           onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//           Descripción
//         </label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
//           Dirección
//         </label>
//         <input
//           id="address"
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_ingreso">
//           Fecha de Ingreso
//         </label>
//         <input
//           id="fecha_ingreso"
//           type="date"
//           value={fecha_ingreso ? fecha_ingreso.toISOString().split('T')[0] : ''}
//           onChange={(e) => setFecha_ingreso(e.target.value ? new Date(e.target.value) : null)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_egreso">
//           Fecha de Egreso
//         </label>
//         <input
//           id="fecha_egreso"
//           type="date"
//           value={fecha_egreso ? fecha_egreso.toISOString().split('T')[0] : ''}
//           onChange={(e) => setFecha_egreso(e.target.value ? new Date(e.target.value) : null)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destino">
//           Destino
//         </label>
//         <input
//           id="destino"
//           type="text"
//           value={destino}
//           onChange={(e) => setDestino(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salida">
//           Salida
//         </label>
//         <input
//           id="salida"
//           type="text"
//           value={salida}
//           onChange={(e) => setSalida(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transportType">
//           Tipo de Transporte
//         </label>
//         <select
//           id="transportType"
//           value={transportType}
//           onChange={(e) => setTransportType(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         >
//           <option value="">Seleccione una opción</option>
//           <option value="bus">Bus</option>
//           <option value="plane">Avión</option>
//         </select>
//       </div>

//       <button type="submit" className="text-white bg-green-700 from-green-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
//         Enviar
//       </button>
//     </form>
//   );
// };

// export default FormularioTour;
