'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import Link from 'next/link';
import CardGrid from '@/components/Card_grid/CardGrid';
import AuthGuardUser from '@/components/AuthGuard/AuthGuardUser';

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

const Favoritos = () => {
  const [favorites, setTours] = useState<ITour[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

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
        setUserId(agencyId);
      }
    }
  }, []);

  useEffect(() => {
    if (token && userId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
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
  }, [token, userId]);

  return (
    <AuthGuardUser>
      <div className="p-6">
        {Array.isArray(favorites) && favorites.length === 0 ? (
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
            {favorites.map((tour) => (
              <CardGrid
                key={tour.id}
                id={tour.id}
                title={tour.title}
                price={tour.price}
                imageUrl={tour.imgUrl}
                oferta={tour.oferta} transportType={'plane'}              />
            ))}
          </div>
        )}
      </div>
    </AuthGuardUser>
  );
};

export default Favoritos;
