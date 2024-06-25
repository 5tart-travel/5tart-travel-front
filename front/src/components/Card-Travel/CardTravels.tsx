
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import useUserRole from '@/utils/userSession';
import { ITravels } from '@/interface/ITravels';
import DeleteTravel from './DeleteTravel';
import EditTravel from './EditTravel';

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

const CardTravels: React.FC<{ 
  travel: ITravels, 
  updateTravel: (travel: ITravels) => void,
  deleteTravel: (travelId: string) => void 
}> = ({ travel, updateTravel, deleteTravel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTravel, setEditedTravel] = useState<ITravels>(travel);
  const userRole = useUserRole(); 

  


  const truncatedDescription = travel.description ? truncateDescription(travel.description, 25) : '';

  useEffect(() => {
    setEditedTravel(travel);
  }, [travel]);

  const imgUrl = travel.imgUrl!.startsWith('http://') || travel.imgUrl!.startsWith('https://')
    ? travel.imgUrl
    : `/${travel.imgUrl}`;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTravel(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTravel(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`https://huellasdesperanza.onrender.com/pets/${travel.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTravel)
      });

      if (response.ok) {
        console.log('Actualizada exitosamente!');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Actualizada exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        setIsEditing(false);
        updateTravel(editedTravel);
      } else {
        console.error('Error al actualizar:', response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar. Por favor, inténtalo de nuevo.'
        });
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar. Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <>
      <div className="bg-gray-50 rounded-xl border-t-4 border-lime500 shadow-xl p-4 m-2 md:m-4 max-w-xs mx-auto transform transition-transform duration-200 hover:scale-105 relative">
        <div className="absolute  top-2 right-2 flex items-center ">
        {userRole !== 'User' && (
          <button onClick={handleEditClick} className="group mr-2  ">
            <svg 
              className=" h-6 w-6 text-lime500 group-hover:text-lime-400 rounded-full" 
            viewBox="0 0 24 24"  
          fill="none"  
        stroke="currentColor"  
      strokeWidth="2"  
    strokeLinecap="round"  
  strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
              )}
          {userRole === 'User' && (

          <DeleteTravel travelId={travel.id} onDelete={deleteTravel} />
)}

        </div>

        <Link href={`/adopta/${travel.id}`}>
          <div className="flex justify-center mt-5">
            {travel.imgUrl && (
              <Image
                src={imgUrl!}
                alt={travel.name!}
                width={150}
                height={150}
                className="w-full h-48 object-cover rounded-t-md" 
                priority
              />
            )}
          </div>
          <div className="p-4">
            <h1 className="text-lg font-semibold mb-2 text-gray-800">{travel.name}</h1>
            <p className="text-gray-600 mb-2">{travel.age} {travel.month}  - {travel.sexo}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 min-h-10">{truncatedDescription}</p>
          </div>
        </Link>
      </div>

      {isEditing && (
        <EditTravel
          editedTravel={editedTravel}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSaveChanges={handleSaveChanges}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};

export default CardTravels;
