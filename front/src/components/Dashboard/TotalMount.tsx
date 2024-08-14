'use client';
import { useEffect, useState } from 'react';
import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface TotalMountProps {
  total: number | null;
  refreshTotal: () => void;
}

const TotalMount = ({ total, refreshTotal }: TotalMountProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
      <div className="w-full max-w-md bg-gradient-to-r from-gray-200 via-white to-gray-300 text-2xl border border-gray-300 rounded-2xl shadow-2xl sm:p-8 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 dark:border-gray-600">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : total !== null ? (
          <p className="text-gray-800 dark:text-gray-200">
            Saldo actual {formatPrice(total)}
          </p>
        ) : null}
      </div>
    </AuthGuardAgency>
  );
};

export default TotalMount;

// 'use client';
// import { useEffect, useState } from 'react';
// import AuthGuardAgency from '@/components/AuthGuard/AuthGuardAgency';
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';

// interface TotalMountProps {
//   total: number | null;
//   refreshTotal: () => void;
// }

// const TotalMount = ({ total, refreshTotal }: TotalMountProps) => {
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     refreshTotal();
//   }, [refreshTotal]);

//   const formatPrice = (price: number) => {
//     const roundedPrice = Math.round(price * 100) / 100;
//     return roundedPrice.toLocaleString('es-CL', {
//       style: 'currency',
//       currency: 'CLP',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     });
//   };

//   return (
//     <AuthGuardAgency>
//       <div className="w-full max-w-md bg-gradient-to-r from-gray-200 via-white to-gray-300 text-2xl border border-gray-300 rounded-2xl shadow-2xl sm:p-8 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 dark:border-gray-600">
//         {error ? (
//           <p className="text-red-500">{error}</p>
//         ) : total !== null ? (
//           <p className="text-gray-800 dark:text-gray-200">
//             Saldo actual {formatPrice(total)}
//           </p>
//         ) : (
//           <div>
//             <p className="text-gray-500 dark:text-gray-400 mb-5 text-center">
//               Loading...
//             </p>
//             <Box sx={{ width: '100%' }}>
//               <LinearProgress />
//             </Box>
//           </div>
//         )}
//       </div>
//     </AuthGuardAgency>
//   );
// };

// export default TotalMount;
