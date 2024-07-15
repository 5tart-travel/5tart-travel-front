'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { checkUserRole, decodeJwt } from '@/utils/decodeJwt';
import { useRouter } from 'next/navigation';
import OrderCard from '@/components/CardTourDashboard/OrderCard';
import { log } from 'console';

interface IOrder {
  id: string;
  userId: string;
  date: string;
  price: number;
  title: string;
}

const Compras = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((orderData: IOrder[]) => {
          if (Array.isArray(orderData)) {
            setOrders(orderData);
          } else {
            setOrders([]);
            console.error('La respuesta de la API no contiene órdenes válidas');
          }
        })
        .catch((error) => {
          setOrders([]);
          console.error('Error al obtener las órdenes:', error);
        });
    }
  }, [token, userId]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Tus compras</h1>
      {Array.isArray(orders) && orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No tienes compras.</p>
          <p>
            Haz click{' '}
            <Link href="/travel" className="text-blue-500">
              aquí
            </Link>{' '}
            para hacer una.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Compras;
