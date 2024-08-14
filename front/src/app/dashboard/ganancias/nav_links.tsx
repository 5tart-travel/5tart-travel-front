import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { decodeJwt } from '@/utils/decodeJwt';

const links = [
  {
    name: 'Detalle ventas',
    href: '/dashboard/ganancias',
  },
  // {
  //   name: 'Facturas',
  //   href: '/dashboard/ganancias/facturas',
  // },
  // {
  //   name: 'Facturas de socio',
  //   href: '/dashboard/ganancias/facturasocio',
  // },
  {
    name: 'Banca',
    href: '/dashboard/ganancias/banca',
  },
];

export default function NavLinks() {
  const [userRole, setUserRole] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const userSessionString = localStorage.getItem('userSession');

    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const ntoken = userSession.token;

      if (ntoken) {
        const decoded = decodeJwt(ntoken);
        setUserRole(decoded.role);
      }
    }
  }, []);

  return (
    <div className="flex space-x-4 overflow-x-auto p-2">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex justify-center text-gray-500 gap-2 p-3 text-lg font-medium hover:text-blue-600 ',
              {
                'underline text-gray-900 underline-offset-4 decoration-2':
                  pathname === link.href,
              },
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
