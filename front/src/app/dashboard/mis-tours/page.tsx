'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import CardGrid from '@/components/Card_grid/CardGrid';
import Link from 'next/link';
import { IBusTour } from '@/interface/IBusTour';

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
          setTours(data.tours);
        })
        .catch((error) => {
          console.error('Error al obtener los tours:', error);
        });
    }
  }, [token, agencyId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {tours.map((tour) => (
        <Link key={tour.id} href={`/travel/pack_plane/${tour.id}`}>
          <CardGrid
            title={tour.title}
            price={tour.price}
            region={tour.region}
            imageUrl={tour.imgUrl}
            oferta={tour.oferta}
          />
        </Link>
      ))}
    </div>
  );
};

export default MisTours;
