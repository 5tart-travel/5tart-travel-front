import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import Swal from 'sweetalert2';
import EditTour from './EditTour';
import DeleteTour from './DeleteTour';

export interface IToursDashboard {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  oferta?: boolean;
  description?: string;
  date?: string;
}

interface CardTourDashboardProps extends IToursDashboard {
  updateTour: (updatedTour: IToursDashboard) => void;
  deleteTour: (tourId: string) => void;
}

const CardTourDashboard: FC<CardTourDashboardProps> = ({
  id,
  title,
  price,
  imgUrl,
  oferta,
  description,
  updateTour,
  deleteTour,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTour, setEditedTour] = useState<IToursDashboard>({
    id,
    title,
    price,
    imgUrl,
    oferta,
    description,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditedTour((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tours/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedTour),
        },
      );

      if (response.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tour actualizado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false);
        updateTour(editedTour);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el tour. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el tour. Por favor, inténtalo de nuevo.',
      });
    }
  };

  return (
    <>
      <div className="w-full h-80 rounded-2xl shadow-2xl overflow-hidden relative">
        <Image
          src={imgUrl}
          alt={title}
          className="object-cover"
          layout="fill"
        />
        {oferta && (
          <div className="absolute top-0 left-0 bg-blue-950 text-white font-bold py-2 px-4 rounded-br-full">
            Oferta
          </div>
        )}
        <div className="absolute top-0 right-0 flex bg-blue-950 py-1 px-4 rounded-bl-full">
          <button onClick={handleEditClick} className="group mr-2">
            <svg
              className="h-6 w-6 text-white rounded-full group-hover:bg-blue-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
          <DeleteTour tourId={id} onDelete={deleteTour} />
        </div>
        <Link href={`/travel/pack_plane/${id}`} key={id}>
          <div className="absolute bottom-0 left-0 p-2 bg-blue-600 hover:bg-blue-950 bg-opacity-35 backdrop-blur-lg shadow-3xl w-[90%] h-auto rounded-2xl flex flex-col mx-4 mb-2">
            <h3 className="text-xl text-gray-50 text-shadow-semidark font-semibold">
              {title}
            </h3>
            <p className="text-2xl text-gray-50 text-shadow-semidark font-bold ">
              ${price}
            </p>
          </div>
        </Link>
      </div>

      {isEditing && (
        <EditTour
          editedTour={editedTour}
          handleInputChange={handleInputChange}
          handleSaveChanges={handleSaveChanges}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};

export default CardTourDashboard;
