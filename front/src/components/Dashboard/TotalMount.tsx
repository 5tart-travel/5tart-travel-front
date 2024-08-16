'use client';
import { useEffect, useState } from 'react';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { MdVisibility } from 'react-icons/md';
import { TbEyeClosed } from 'react-icons/tb';
import DeleteOrders from './DeleteOrders';

interface TotalMountProps {
  total: number | null;
  refreshTotal: () => void;
}

const TotalMount = ({ total, refreshTotal }: TotalMountProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextMonday, setNextMonday] = useState<Date | null>(null);
  const [showBalance, setShowBalance] = useState<boolean>(false);

  useEffect(() => {
    const savedShowBalance = localStorage.getItem('showBalance');
    if (savedShowBalance !== null) {
      setShowBalance(JSON.parse(savedShowBalance));
    }

    const calculateNextMonday = () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7;
      const nextMondayDate = new Date(today);
      nextMondayDate.setDate(today.getDate() + daysUntilNextMonday);
      return nextMondayDate;
    };

    setNextMonday(calculateNextMonday());

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    refreshTotal();

    return () => clearTimeout(timer);
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

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const monthAbbreviations = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];
    const month = monthAbbreviations[date.getMonth()];

    return `${day} ${month}`;
  };

  const toggleBalanceVisibility = () => {
    setShowBalance((prevShowBalance) => {
      const newShowBalance = !prevShowBalance;
      localStorage.setItem('showBalance', JSON.stringify(newShowBalance));
      return newShowBalance;
    });
  };

  if (loading) {
    return (
      <AuthGuardAgency>
        <div className="w-full max-w-md bg-gradient-to-r from-gray-200 via-white to-gray-300 text-2xl border border-gray-300 rounded-2xl shadow-2xl sm:p-8 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 dark:border-gray-600">
          <div>
            <p className="text-gray-500 dark:text-gray-400 mb-5 text-center">
              Loading...
            </p>
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </div>
        </div>
      </AuthGuardAgency>
    );
  }

  return (
    <AuthGuardAgency>
      <div className="w-full max-w-md bg-gradient-to-r from-gray-200 via-white to-gray-300 text-2xl border border-gray-300 rounded-2xl shadow-2xl sm:p-5 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 dark:border-gray-600">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : total !== null ? (
          <div>
            <p className="text-gray-600 text-base mb-4">Saldo</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-800 dark:text-gray-200">
                {showBalance ? `ARS ${formatPrice(total)}` : '******'}
              </p>
              <button className="mr-5" onClick={toggleBalanceVisibility}>
                {showBalance ? <MdVisibility /> : <TbEyeClosed />}
              </button>
            </div>
            <p className="text-gray-500 text-base mt-2">
              Pago programado: {nextMonday && formatDate(nextMonday)}
            </p>
            <div className="mt-5">
              <DeleteOrders refreshTotal={refreshTotal} />
            </div>
          </div>
        ) : null}
      </div>
    </AuthGuardAgency>
  );
};

export default TotalMount;
