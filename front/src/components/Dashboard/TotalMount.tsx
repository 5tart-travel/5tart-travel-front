'use client';
import { useEffect, useState } from 'react';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';

interface TotalMountProps {
  total: number | null;
  refreshTotal: () => void;
}

const TotalMount = ({ total, refreshTotal }: TotalMountProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshTotal();
  }, [refreshTotal]);

  const formatPrice = (price: number) => {
    const roundedPrice = Math.round(price * 100) / 100;
    return roundedPrice.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <AuthGuardAgency>
      <div className="mt-5 w-full max-w-md bg-gray-200 border text-2xl border-gray-200 rounded-bl-3xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        {error ? (
          <p>{error}</p>
        ) : total !== null ? (
          <p>Saldo actual {formatPrice(total)}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </AuthGuardAgency>
  );
};

export default TotalMount;
