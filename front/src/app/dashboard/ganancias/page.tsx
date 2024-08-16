'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJwt } from '@/utils/decodeJwt';
import { IToursDashboard } from '@/components/CardTourDashboard/CardTourDashboard';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';

const Ganancias = () => {
  const [orders, setOrders] = useState<IToursDashboard[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);

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

  const refreshTotal = () => {
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
        });
    }
  };

  return (
    <AuthGuardAgency>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between font-bold px-8">
          <div>Título</div>
          <div>Fecha</div>
          <div>Precio</div>
        </div>
        <hr />

        {orders.length === 0 ? (
          <div className="flex justify-center items-center p-4 text-gray-500">
            Sin actividad en el historial de ganancias
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-300 px-4 rounded-lg "
            >
              <div className="flex justify-between">
                <div className="flex-1">{order.title}</div>
                <div className="flex-1 text-center">
                  {formatDate(order.date!)}
                </div>
                <div className="flex-1 text-right">
                  ${formatPrice(order.price)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AuthGuardAgency>
  );
};

export default Ganancias;
