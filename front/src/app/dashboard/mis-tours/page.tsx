'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import Link from 'next/link';
import { IBusTour } from '@/interface/IBusTour';
import CardTourDashboard from '@/components/CardTourDashboard/CardTourDashboard';

const MisTours = () => {
  const [tours, setTours] = useState<IBusTour[]>([]);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [agencyId, setAgencyId] = useState<string | null>(null);

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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/${agencyId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.tours)) {
            setTours(data.tours);
          } else {
            setTours([]);
            console.error(
              'La respuesta de la API no contiene un array de tours',
            );
          }
        })
        .catch((error) => {
          setTours([]);
          console.error('Error al obtener los tours:', error);
        });
    }
  }, [token, agencyId]);

  return (
    <div className="p-6">
      {Array.isArray(tours) && tours.length === 0 ? (
        <div className="text-center">
          <p>
            Aún no tienes tours, has click{' '}
            <Link href="/dashboard/agregar-tour" className="text-blue-500">
              aquí
            </Link>{' '}
            para crear uno.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(tours) &&
            tours.map((tour) => (
              <Link key={tour.id} href={`/travel/pack_plane/${tour.id}`}>
                <CardTourDashboard
                  title={tour.title}
                  price={tour.price}
                  region={tour.region}
                  imgUrl={tour.imgUrl}
                  oferta={tour.oferta}
                />
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default MisTours;
