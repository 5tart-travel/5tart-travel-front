import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CiLogin } from "react-icons/ci";
import { FaRegUserCircle , FaHome } from "react-icons/fa";
import { GiAirplaneDeparture } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";


import Link from 'next/link';

interface DesplegableUserProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const DesplegableUser: React.FC<DesplegableUserProps> = ({ isOpen, toggleMenu }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = useCallback(() => {
    const isSmallerScreen = window.innerWidth <= 640; 
    setIsMobile(isSmallerScreen);
  }, []);

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    window.location.href = '/AUTH/login'; 
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        toggleMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleMenu]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        id="dropdownDelay"
        className={`absolute right-0 z-10 mt-2 w-48 rounded-lg shadow-xl border-t-4 border-lime500 bg-white ${isOpen ? 'block' : 'hidden'}`}
      >
        <ul className="py-2">
          <li>
            <a
              href="/dashboard/mi-perfil"
              className="flex h-12 w-full gap-2 font-semibold items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 rounded-t-lg"
            >
              <FaRegUserCircle />
              Mi cuenta
            </a>
          </li>
         
          {isOpen && isMobile && (
            <>
              <li>
                <Link href="/"
              className="flex h-12 w-full items-center gap-2 font-semibold px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 rounded-b-lg"
            >
              <FaHome />
              Inicio</Link>
              </li>
              <li>
                <Link href="/travel"
              className="flex h-12 w-full items-center gap-2 font-semibold px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 rounded-b-lg"
            >
              <GiAirplaneDeparture />
              Viajes</Link>
              </li>
              <li>
                <Link href="/nosotros"
              className="flex h-12 w-full items-center gap-2 font-semibold px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 rounded-b-lg"
            >
              <IoIosPeople />
              Nosotros</Link>
              </li>
            </>
          )}
          <li>
            <p
              onClick={handleLogout}
              className="flex h-12 w-full items-center gap-2 font-semibold px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 rounded-b-lg"
            >
              <CiLogin />
              Cerrar sesión
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesplegableUser;
