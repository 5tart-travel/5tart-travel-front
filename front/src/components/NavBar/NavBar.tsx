'use client';
import Logo from '../ui/Logo';
import NavMenu from './NavMenu';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { decodeJwt } from '@/utils/decodeJwt';
import Image from 'next/image';
import { JwtPayload } from '@/types';
import { RiLoginCircleLine } from 'react-icons/ri';
import { MdDashboardCustomize } from 'react-icons/md';
import DesplegableUser from './desplegable';
import useUserRole from '@/utils/userSession';
import SearchBar from '../SearchBar/SearchBar';

const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/yglvytp7lyjwt2lkygba.webp';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-blue-950 h-24 flex items-center justify-between px-4">
      <div className="flex items-center justify-center mb-10">
        <Logo />
      </div>

      <NavMenu />
      <SearchBar />

      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center">
              <button onClick={toggleMenu}>
                <Image
                  className="rounded-full w-8 h-8 mt-4 border-blue-300  border-3 hover:animate-spin"
                  alt="Avatar de usuario"
                  src={userData?.picture || DEFAULT_AVATAR}
                  width={100}
                  height={100}
                />
              </button>
              <DesplegableUser isOpen={isMenuOpen} toggleMenu={toggleMenu} />
              <div className=" mt-1 text-sm font-medium text-gray-50 hover:text-blue-300">
                {userData && userData.nickname && (
                  <button className="focus:outline-none" onClick={toggleMenu}>
                    {userData.nickname}
                  </button>
                )}
              </div>
            </div>

            {userRole !== 'agency' && (
              <Link href="/dashboard">
                <button className="m-4 text-4xl text-white mr-6 mt-1 hover:animate-bounce">
                  <MdDashboardCustomize />
                </button>
              </Link>
            )}
          </div>
        ) : (
          <button>
            <Link href="/AUTH/login">
              <div className="text-4xl text-white mr-6 hover:text-blue-300">
                <RiLoginCircleLine />
              </div>
            </Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
