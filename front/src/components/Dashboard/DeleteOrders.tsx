'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';

const DeleteOrders = () => {
  const [message, setMessage] = useState<string | null>(null);
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
        decodeJwt(ntoken);
      }
    }
  }, []);

  const deleteOrders = () => {
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/orders`, {
        method: 'DELETE',
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
          if (data.success) {
            setMessage('All orders have been deleted successfully.');
          } else {
            throw new Error('Unexpected response structure');
          }
        })
        .catch((error) => {
          console.error('Error deleting orders:', error);
          setError('Error deleting orders');
        });
    }
  };

  return (
    <AuthGuardAgency>
      <div>
        {error ? (
          <p>{error}</p>
        ) : message ? (
          <p>{message}</p>
        ) : (
          <button onClick={deleteOrders}>Eliminar orden</button>
        )}
      </div>
    </AuthGuardAgency>
  );
};

export default DeleteOrders;
