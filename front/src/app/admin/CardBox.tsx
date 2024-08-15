import socket from '@/hooks/useSocket';
import axios from 'axios';
import { useState, useEffect, useRef, Fragment } from 'react';
import { BsFillInboxesFill } from "react-icons/bs";
import { MdDelete } from 'react-icons/md';
import { FaMailBulk } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

export interface Agency {
  id: string;
  name_agency: string;
  date: string;

}

export interface User {
  id: string;
  username: string;
  date: string;
}

const CardBox: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedNotification, setSelectedNotification] = useState< Agency | User | any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get<Agency[]>('https://fivetart-travel-kafg.onrender.com/agency/disable/seen');
        if (Array.isArray(response.data)) {
          setAgencies(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
        }

        const response2 = await axios.get<User[]>('https://fivetart-travel-kafg.onrender.com/user/disable/seen');
        if (Array.isArray(response2.data)) {
          setUsers(response2.data);
        } else {
          console.error('Response data is not an array:', response2.data);
        }

      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('getAllItems');
    });

    socket.on('allDisableAgency', (items: any) => {
      if (Array.isArray(items)) {
        setAgencies(items);
        console.log('Nueva notificacion recibida');
        if (audioRef.current) {
          audioRef.current.play().catch(error => console.error('Error de audio:', error));
        }
      } else {
        console.error('Received items are not an array:', items);
      }
    });

    socket.on('allUsers', (items: any) => {
      if (Array.isArray(items)) {
        console.log(items);
        
        setUsers(items);
        console.log('Nueva notificacion recibida');
        if (audioRef.current) {
          audioRef.current.play().catch(error => console.error('Error de audio:', error));
        }
      } else {
        console.error('Received items are not an array:', items);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('allDisableAgency');
      socket.off('disconnect');
    };
  }, []);

  const openModal = (notification: Agency) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const deleteNotification = async (id: string, type: any) => {
      const url = `https://fivetart-travel-kafg.onrender.com/agency/disable/seen/${id}`;
      await axios.put(url);
  
      if (type.name_agency) {
        setAgencies(prevAgencies => prevAgencies.filter(agency => agency.id !== id));
        closeModal();
      } else {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        closeModal();
      }  
    
    console.error('Error al eliminar la notificación:');      
      
  };

  const desord: any[] = [...agencies, ...users]; 
  const notification = desord.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  console.log(notification);
  

  const formatDate = (dateString: string) => {
    const optionss: any = {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false, // Formato de 24 horas
    };
    return new Date(dateString).toLocaleDateString('es-ES', optionss);
  };

  return (
    <div className="relative p-4 bg-white rounded-2xl shadow-2xl cursor-pointer w-60 h-full transition-all duration-500 custom-scrollbar overflow-y-auto">
      <audio ref={audioRef} src="/sounds/notification2.mp3" preload="auto"></audio>
      <div className="absolute top-2 left-2 bg-white rounded-full p-2">
        <BsFillInboxesFill className="text-lime-700" size={24} />
      </div>
      <div className="absolute top-2 right-2 bg-white rounded-full p-2">
        <BsFillInboxesFill className="text-cyan-500" size={24} />
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-xl text-gray-600 font-semibold">Inbox</p>
        <p className="text-3xl text-gray-600 font-bold">{notification.length}</p>
      </div>
      <div className="mt-4 w-full">
        {notification.length > 0 ? (
          notification.map((item: any) => (
            <div
              key={item.id}
              className="p-2 border-b border-gray-200 bg-white hover:bg-blue-100 text-gray-700 rounded-md shadow-md mb-2 overflow-hidden"
              onClick={() => openModal(item)}
            >
              <motion.p
                className="text-sm font-semibold"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                {item.name_agency ? `Nueva agencia: ${item.name_agency} para activar` : `Nuevo usuario: ${item.username} registrado`}
                <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
              </motion.p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl py-4 w-full">
            <p className="text-sm text-gray-500">No hay notificaciones</p>
          </div>
        )}
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
  <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
    <div className="min-h-screen px-4 text-center">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black opacity-30" />
      </Transition.Child>

      <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title as="h2" className="text-lg font-medium leading-6 text-indigo-600">
            <FaMailBulk className="text-5xl" />
          </Dialog.Title>
          <div className="mt-2 text-center">
            {selectedNotification?.name_agency ? (
              <h1 className="text-lg font-semibold text-gray-600">
                Agencia registrada: <br /> <strong className="text-indigo-500">{selectedNotification.name_agency}</strong>
              </h1>
            ) : (
              <h1 className="text-lg font-semibold text-gray-600">
                Usuario registrado: <br /> <strong className="text-indigo-500">{selectedNotification?.username}</strong><br />
                Email: <strong className="text-indigo-500">{selectedNotification?.email}</strong>
              </h1>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={() => deleteNotification(selectedNotification!.id, selectedNotification!)}
            >
              <MdDelete size={20} className="mr-1" />
            </button>
            <button
              type="button"
              className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Dialog>
</Transition>

    </div>
  );
};

export default CardBox;


