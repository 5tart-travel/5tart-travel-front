'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface HiddenFooterProps {
  children: ReactNode;
}

const HiddenFooter: React.FC<HiddenFooterProps> = ({ children }) => {
  const pathname = usePathname();
  const hiddenPaths = [ 
    '/',
    '/dashboard', 
    '/dashboard/admin', 
    '/dashboard/user',
    '/dashboard/shelter',
    '/dashboard/donations',
    '/dashboard/petslost',
    '/dashboard/adopted',
    '/dashboard/postulaciones',
    '/dashboard/add-pet',
    '/dashboard/config-profile',
    '/dashboard/pets',
    '/contacto',
    // '/minidashboard',
  ];
  
  const isHidden = hiddenPaths.includes(pathname);

  return (
    <div className={isHidden ? 'hidden' : ''}>
      {children}
    </div>
  );
};

export default HiddenFooter;
