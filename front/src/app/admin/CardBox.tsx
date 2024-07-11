// 'use client';
// import { useState, useEffect } from 'react';
// import { BsFillInboxesFill } from "react-icons/bs";

// interface Notification {
//   username: string;
//   message: string;
//   mail: string;
//   telefono: string;
// }

// const CardBox: React.FC = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     // Hardcoded notifications for testing
//     const hardcodedNotifications: Notification[] = [
//       {
//         username: 'Juan Perez',
//         message: 'Tu cuenta ha sido activada.',
//         mail: 'juan.perez@example.com',
//         telefono: '123-456-7890',
//       },
//       {
//         username: 'María López',
//         message: 'Tu solicitud ha sido recibida.',
//         mail: 'maria.lopez@example.com',
//         telefono: '098-765-4321',
//       },
//       {
//         username: 'Carlos Garcia',
//         message: 'Nuevo mensaje de soporte.',
//         mail: 'carlos.garcia@example.com',
//         telefono: '555-555-5555',
//       },
//     ];

//     setNotifications(hardcodedNotifications);
//   }, []);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className={`relative p-4 bg-white rounded-2xl shadow-2xl cursor-pointer text-white w-60 transition-all duration-500 ${isExpanded ? 'h-auto' : 'h-[110px]'}`} onClick={toggleExpand}>
//       <div className="absolute top-2 left-2 bg-white rounded-full p-2">
//         <BsFillInboxesFill className="text-lime-700" size={24} />
//       </div>
//       <div className="absolute bottom-2 right-2">
//         <BsFillInboxesFill className="text-cyan-500" size={24} />
//       </div>
//       <div className="flex flex-col items-center justify-center h-full">
//         <p className="text-5xl text-gray-600 font-bold text-shadow-medium ">{notifications.length}</p>
//         <p className="text-xl text-gray-600 text-shadow-medium font-semibold ">Inbox</p>
//       </div>
//       {isExpanded && (
//         <div className="mt-4 max-h-96 overflow-y-auto">
//           {notifications.length > 0 ? (
//             notifications.map((notification, index) => (
//               <div key={index} className="p-2 border-b border-gray-200 bg-white text-gray-700 rounded-md shadow-md mb-2">
//                 <p className="text-sm font-semibold">{notification.username}</p>
//                 <p className="text-sm">{notification.message}</p>
//                 <p className="text-sm text-gray-500">{notification.mail}</p>
//                 <p className="text-sm text-gray-500">{notification.telefono}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No hay notificaciones</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardBox;


'use client';
import { useState, useEffect } from 'react';
import { BsFillInboxesFill } from "react-icons/bs";

interface Notification {
  type: 'user' | 'agency';
  message: string;
}

const CardBox: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    
    const hardcodedNotifications: Notification[] = [
      {
        type: 'user',
        message: 'Nuevo usuario registrado.',
      },
      {
        type: 'agency',
        message: 'Nueva agencia para activar.',
      },
      {
        type: 'user',
        message: 'Nuevo usuario registrado.',
      },
      {
        type: 'agency',
        message: 'Nueva agencia para activar.',
      },
      {
        type: 'user',
        message: 'Nuevo usuario registrado.',
      },
      {
        type: 'agency',
        message: 'Nueva agencia para activar.',
      },
      {
        type: 'user',
        message: 'Nuevo usuario registrado.',
      },
    ];

    setNotifications(hardcodedNotifications);
  }, []);

  return (
    <div
      className={`relative p-4 bg-white rounded-2xl shadow-2xl cursor-pointer w-60 h-full transition-all duration-500 custom-scrollbar overflow-y-auto`}
    >
      <div className="absolute top-2 left-2 bg-white rounded-full p-2">
        <BsFillInboxesFill className="text-lime-700" size={24} />
      </div>
      <div className="absolute top-2 right-2 bg-white rounded-full p-2">
        <BsFillInboxesFill className="text-cyan-500" size={24} />
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-xl text-gray-600 font-semibold">Inbox</p>
        <p className="text-3xl text-gray-600 font-bold">{notifications.length}</p>
      </div>
      <div className="mt-4 w-full">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="p-2 border-b border-gray-200 bg-white hover:bg-blue-100 text-gray-700 rounded-md shadow-md mb-2 overflow-hidden">
              <p className="text-sm font-semibold truncate">{notification.message}</p>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl py-4 w-full' >
             <p className="text-sm  text-gray-500">No hay notificaciones</p>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default CardBox;
