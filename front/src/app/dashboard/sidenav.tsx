'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavLinks from './nav_links';
import { FaPowerOff } from 'react-icons/fa';
import { decodeJwt } from '@/utils/decodeJwt';
import { JwtPayload } from '@/types/index';

const SideNav: React.FC = () => {
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const { id_token } = JSON.parse(session);
      if (id_token) {
        const decodedToken = decodeJwt(id_token);
        if (decodedToken) {
          setUserData({
            name: decodedToken.name,
            nickname: decodedToken.nickname,
            picture: decodedToken.picture,
            email: decodedToken.email,
          });
          setIsLoggedIn(true);
          setIsGoogleAuthenticated(true);
        }
      }
    } else {
      setIsLoggedIn(false);
      setIsGoogleAuthenticated(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setUserData(null);
    setIsGoogleAuthenticated(false);
  };

  return (
    <div className="flex h-full flex-col md:flex-row md:justify-between px-3 py-4 m-0 p-0">
      <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <form className="w-full md:w-auto">
          <Link href={'/'}>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-blue-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <FaPowerOff className="w-6" />
              <div className="hidden md:block">Cerrar sesión</div>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SideNav;
