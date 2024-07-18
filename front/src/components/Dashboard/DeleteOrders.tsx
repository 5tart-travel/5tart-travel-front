'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';
import Swal from 'sweetalert2';

interface DeleteOrdersProps {
  refreshTotal: () => void;
}

const DeleteOrders = ({ refreshTotal }: DeleteOrdersProps) => {
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

  const deleteOrders = async () => {
    if (token) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/agency/orders/amount`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            errorResponse.message || 'Network response was not ok',
          );
        }

        const data = await response.json();

        if (data.id) {
          setMessage('Extracción exitosa');
          setError(null);
          refreshTotal();
        } else {
          console.error('Unexpected response structure:', data);
          throw new Error('Unexpected response structure');
        }
      } catch (err) {
        console.error('Error deleting orders:', err);
        if (err instanceof Error) {
          setError(`Error deleting orders: ${err.message}`);
        } else {
          setError('Error deleting orders');
        }
        setMessage(null);
      }
    } else {
      setError('No token available');
    }
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, extraer',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrders();
        Swal.fire('Transaccion exitosa!', '', 'success');
      }
    });
  };

  return (
    <AuthGuardAgency>
      <div>
        {error ? (
          <p>{error}</p>
        ) : message ? (
          <p>{message}</p>
        ) : (
          <button
            onClick={handleDeleteClick}
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-300 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Retirar saldo
          </button>
        )}
      </div>
    </AuthGuardAgency>
  );
};

export default DeleteOrders;
