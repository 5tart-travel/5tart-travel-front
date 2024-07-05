'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import { ITours } from '@/interface/ITours';

const MisTours = () => {
  const [tours, setTours] = useState<ITours[]>([]);
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
    <div>
      <h1>Mis Tours</h1>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            {tour.title} - ${tour.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisTours;
