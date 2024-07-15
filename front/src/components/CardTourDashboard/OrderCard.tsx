import React from 'react';
import { FcCheckmark } from 'react-icons/fc';

interface IOrderCardProps {
  order: {
    id: string;
    title: string;
    price: number;
    date: string;
  };
}

const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center border shadow-xl bg-gray-100 rounded-lg p-4 m-2 w-full sm:w-1/2 md:w-1/3">
      <div className="flex-shrink-0">
        <FcCheckmark className="w-8 h-8 text-gray-600 dark:text-gray-400 mt-0.5" />
      </div>
      <div className="flex-1 min-w-0 ml-4">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {order.title}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          Fecha: {formatDate(order.date)}
        </p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        ${order.price}
      </div>
    </div>
  );
};

export default OrderCard;
