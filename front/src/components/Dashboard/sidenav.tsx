import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavLinks from './nav_links';
import { FaPowerOff } from 'react-icons/fa';
import Image from 'next/image';
import { decodeJwt } from '@/utils/decodeJwt';
import { JwtPayload } from '@/types/index';
import useUserRole from '@/utils/userSession';
import Logo from '../ui/Logo';

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/yglvytp7lyjwt2lkygba.webp';

const SideNav: React.FC<{ role: 'admin' | 'user' | 'agency' }> = ({ role }) => {
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userRole = useUserRole(); 

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const { token } = JSON.parse(session);
      if (token) {
        const decodedToken = decodeJwt(token);
        if (decodedToken) {
          setUserData({
            nickname: decodedToken.username,
            picture: decodedToken.picture || DEFAULT_AVATAR,
            email: decodedToken.email,
            role: decodedToken.role,
          });
          setIsLoggedIn(true);
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-full px-2 w-56 py-2 md:px-2 z-0">
      {userRole !== 'agency' && (
        <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-950 p-4 md:h-40" href="/">
          <div className="w-32 text-white md:w-40">
            <Logo />
          </div>
        </Link>
      )}
      <div className="text-center mb-4">
        {isLoggedIn ? (
          <>
            <div className="flex items-center justify-center mb-2 bg-gray-200 p-3 rounded-md">
              <Image
                className="rounded-full w-10 h-10 object-cover" 
                alt="Avatar de usuario"
                src={userData?.picture || DEFAULT_AVATAR}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col  grow items-center justify-center  rounded-md bg-gray-200 p-3 text-xs  md:flex-none md:justify-start md:p-2 md:px-3">
              {userData && (
                <>
                  {userData.nickname && <p className="text-gray-800 text-xl">{userData.nickname}</p>}
                  {userData.email && <p className="text-gray-800 text-base">{userData.email}</p>}
                  {userData.role && <p className="text-gray-800 text-base">{userData.role}</p>}
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-[100px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-xs font-normal md:flex-none md:justify-start md:p-2 md:px-3">
            <p className="text-gray-500"><strong>Nombre:</strong></p>
            <p className="text-gray-500"><strong>Email:</strong></p>
          </div>
        )}
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        
        <NavLinks role={role} /> 
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block"></div>
        <form className="w-full">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-[48px] w-full mb-8 items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-indigo-200 hover:text-indigo-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <FaPowerOff className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SideNav;
