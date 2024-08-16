'use client';

import { useEffect, useState } from 'react';
import NavLinks from './nav_links';
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

  return (
    <div className="flex h-full flex-col md:flex-row md:justify-center">
      <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
};

export default SideNav;
