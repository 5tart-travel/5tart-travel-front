import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {  FaHome, FaUsers } from 'react-icons/fa';
import { MdOutlineFavorite, MdDashboardCustomize,  } from 'react-icons/md';


const userLinks = [
  { name: 'Home', href: '/', icon: FaHome },
  { name: 'Dashboard', href: '/dashboard', icon: MdDashboardCustomize },
  { name: 'Favoritos', href: '/dashboard/favorites', icon: MdOutlineFavorite },
];

const adminLinks = [
  { name: 'Home', href: '/', icon: FaHome },
  { name: 'Dashboard', href: '/dashboard', icon: MdDashboardCustomize },
  { name: 'Usuarios', href: '/dashboard/all_users', icon: FaUsers },
  
];

const agencyLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: MdDashboardCustomize },
  { name: 'Editar perfil', href: '/dashboard/config-profile', icon: MdOutlineFavorite },
  
];

const NavLinks: React.FC<{ role: 'admin' | 'user' | 'agency' }> = ({ role }) => {
  const pathname = usePathname();
  const links = role === 'admin' ? adminLinks : role === 'agency' ? agencyLinks : userLinks;

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-indigo-300 hover:text-indigo-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-indigo-100 text-indigo-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;

