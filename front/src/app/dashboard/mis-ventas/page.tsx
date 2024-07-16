'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import { IToursDashboard } from '@/components/CardTourDashboard/CardTourDashboard';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';
import TotalMount from '@/components/Dashboard/TotalMount';
import DeleteOrders from '@/components/Dashboard/DeleteOrders';

const MisVentas = () => {
  const [orders, setOrders] = useState<IToursDashboard[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [agencyId, setAgencyId] = useState<string | null>(null);

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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency/${agencyId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else {
            setOrders([]);
            console.error(
              'La respuesta de la API no contiene un array de orders',
            );
          }
        })
        .catch((error) => {
          setOrders([]);
          console.error('Error al obtener las orders:', error);
        });
    }
  }, [token, agencyId]);

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <AuthGuardAgency>
      <div className="flex">
        <div className="w-full">
          {orders.map((order, index) => (
            <div
              key={index}
              className="mt-5 w-full max-w-md bg-gray-200 border border-gray-200 rounded-br-3xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flow-root">
                  <ul>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {order.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {formatDate(order.date!)}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  ${formatPrice(order.price)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <TotalMount />
        </div>
      </div>
    </AuthGuardAgency>
  );
};

export default MisVentas;
