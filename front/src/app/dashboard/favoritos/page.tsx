'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import Link from 'next/link';
import Swal from 'sweetalert2';
import CardGrid from '@/components/Card_grid/CardGrid';

interface ITour {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  oferta: boolean;
}

interface IUser {
  id: string;
  username: string;
  mail: string;
  password: string;
  birthday: string;
  favorite_tours: ITour[];
}

const MisTours = () => {
  const [tours, setTours] = useState<ITour[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<ITour | null>(null);
  const [editedTour, setEditedTour] = useState<ITour | null>(null);

  const router = useRouter();

  useEffect(() => {
    const userSessionString: any = localStorage.getItem('userSession');

    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const ntoken = userSession.token;
      setToken(ntoken);

      if (ntoken) {
        const decoded: any = decodeJwt(ntoken);
        const agencyId = decoded.id;
        setAgencyId(agencyId);
      }
    }
  }, []);

  useEffect(() => {
    if (token && agencyId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${agencyId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((userData: IUser) => {
          console.log(userData);
          if (userData && userData.favorite_tours) {
            setTours(userData.favorite_tours);
          } else {
            setTours([]);
            console.error('La respuesta de la API no contiene favoritos');
          }
        })
        .catch((error) => {
          setTours([]);
          console.error('Error al obtener los favoritos:', error);
        });
    }
  }, [token, agencyId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editedTour) {
      setEditedTour({ ...editedTour, [e.target.name]: e.target.value });
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (editedTour && editedTour.id && token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tours/${editedTour.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTour),
          },
        );

        if (response.ok) {
          const data = await response.json();
          setTours(tours.map((tour) => (tour.id === data.id ? data : tour)));
          setSelectedTour(null);
          setEditedTour(null);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el tour. Por favor, inténtalo de nuevo.',
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el tour. Por favor, inténtalo de nuevo.',
      });
    }
  };

  const handleModalClose = () => {
    setSelectedTour(null);
    setEditedTour(null);
  };

  const handleDeleteTour = (tourId: string) => {
    setTours(tours.filter((tour) => tour.id !== tourId));
  };

  return (
    <div className="p-6">
      {Array.isArray(tours) && tours.length === 0 ? (
        <div className="text-center">
          <p>
            No tienes favoritos, has click{' '}
            <Link href="/travel" className="text-blue-500">
              aquí
            </Link>{' '}
            para crear uno.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <CardGrid
              key={tour.id}
              id={tour.id}
              title={tour.title}
              price={tour.price}
              imageUrl={tour.imgUrl}
              oferta={tour.oferta}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MisTours;
