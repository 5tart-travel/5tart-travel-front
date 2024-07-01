'use client';

import { useEffect, useState } from 'react';
import { checkUserRole } from '@/libs/auth';
import DashboardMain from '@/components/Dashboard/DashboardMain';

const DashboardPage: React.FC = () => {
  const [role, setRole] = useState<'admin' | 'user' | 'shelter'>('user');

  useEffect(() => {
    const role = checkUserRole();
    setRole(role);
  }, []);

  const backgroundStyle = {
    backgroundImage: 'url(https://res.cloudinary.com/dia2gautk/image/upload/v1719645512/hifsflcoaegwvao2ojby.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };

  return (
    <div className="flex h-screen">
      <main style={backgroundStyle} className="flex-1 p-4 overflow-y-auto">
        <DashboardMain role={role} />
      </main>
    </div>
  );
};

export default DashboardPage;
