'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';

const TotalMount = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const userSessionString: any = localStorage.getItem('userSession');

    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const ntoken = userSession.token;
      setToken(ntoken);

      if (ntoken) {
        decodeJwt(ntoken); // Decodificar token si es necesario para otro uso
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/totalMount`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (typeof data === 'number') {
            setTotal(data);
          } else {
            throw new Error('Unexpected response structure');
          }
        })
        .catch((error) => {
          console.error('Error fetching total mount:', error);
          setError('Error fetching total mount');
        });
    }
  }, [token]);
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <AuthGuardAgency>
      <div className="mt-5 w-full max-w-md bg-gray-200 border text-2xl border-gray-200 rounded-bl-3xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        {error ? (
          <p>{error}</p>
        ) : total !== null ? (
          <p>Saldo actual ${formatPrice(total)}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </AuthGuardAgency>
  );
};

export default TotalMount;
