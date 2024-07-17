'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiLoginCircleLine } from 'react-icons/ri';
import Search from './Search';
import Logo from '../ui/Logo';
import NavMenu from './NavMenu';
import { decodeJwt } from '@/utils/decodeJwt';
import { JwtPayload } from '@/types';
import DesplegableUser from './desplegable';
import { CiMenuBurger } from "react-icons/ci";
import SwitcherTema from './SwitcherTema';
import { usePathname } from 'next/navigation'

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/yglvytp7lyjwt2lkygba.webp';
const ADMIN_AVATAR = 'https://res.cloudinary.com/dia2gautk/image/upload/v1719631293/How-To-Fit-An-MX-5-Into-A-Pickup-Truck-Speedhunters_zy37c4';

const Navbar = (props: any) => {
  const pathname = usePathname();

  const { toggleTema, tema } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Partial<JwtPayload> | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const { token } = JSON.parse(session);
      if (token) {
        const decodedToken = decodeJwt(token);
        if (decodedToken) {
          setUserData({
            nickname: decodedToken.username,
            picture: decodedToken.role === 'admin' ? ADMIN_AVATAR : (decodedToken.picture || DEFAULT_AVATAR),
            email: decodedToken.email,
            role: decodedToken.role,
            name_agency: decodedToken.name_agency
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

  const handleAvatarClick = () => {
    toggleMenu();
  };

  return (
    <header className={`${tema ? 'bg-black' : 'bg-blue-950'} h-24 flex items-center justify-between px-4`}>
      <div className="flex items-center justify-center mb-10">
        <Logo />
      </div>

      <NavMenu />

      <div className="w-1/12 md:w-1/12 lg:w-nav lg:flex justify-between h-custom-4">
        <Search />

        {pathname === '/' && (
          <div onClick={toggleTema} className="hidden lg:flex bg-inherit border-none cursor-pointer">
            <SwitcherTema tema={tema} />
          </div>
        )}

        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center justify-center cursor-pointer mx-4 md:mx-3 sm:mx-2">
              <div className="flex flex-col items-center">
                <button ref={avatarButtonRef} onClick={handleAvatarClick}>
                  <Image
                    className="rounded-full w-10 h-10 lg:w-10 lg:h-10 md:w-6 md:h-6 sm:w-6 sm:h-6 mt-4 border-blue-300 border-3 hover:animate-spin"
                    alt="Avatar de usuario"
                    src={userData?.picture || DEFAULT_AVATAR}
                    width={200}
                    height={200}
                  />
                </button>
                <DesplegableUser isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div className="mt-1 text-sm font-medium text-gray-50 hover:text-blue-300">
                  {  userData && userData.nickname ? 
                    (
                    <button className="focus:outline-none" onClick={handleAvatarClick}>
                      {userData.nickname}
                    </button> ) : 
                    (  
                    <button className="focus:outline-none" onClick={handleAvatarClick}>
                      {userData?.name_agency}
                    </button>  
                    )
                  }
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link href="/AUTH/login">
                <div className="hidden md:flex items-center justify-center cursor-pointer text-white text-4xl mr-6 hover:text-blue-300">
                  <RiLoginCircleLine />
                </div>
              </Link>
              <div className="flex items-center justify-center cursor-pointer md:hidden">
                <div className="flex flex-col items-center">
                  <button ref={avatarButtonRef} onClick={handleAvatarClick}>
                    <CiMenuBurger className='text-white' />
                  </button>
                  <DesplegableUser isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                  <div className="mt-1 text-sm font-medium text-gray-50 hover:text-blue-300">
                    {userData && userData.nickname && (
                      <button className="focus:outline-none" onClick={handleAvatarClick}>
                        {userData.nickname}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
