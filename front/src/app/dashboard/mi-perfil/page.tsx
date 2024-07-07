'use client'
import React, { useEffect, useState } from 'react';
import { decodeJwt } from '@/utils/decodeJwt';
import { IRole } from '@/interface/IRole';
import Agency from '@/components/Dashboard/DatosRole/Agency';
import Admin from '@/components/Dashboard/DatosRole/Admin';
import User from '@/components/Dashboard/DatosRole/User';

const MiPerfil = () => {
  const [userRole, setUserRole] = useState<string | null>(null); 
  const [userData, setUserData] = useState<IRole | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('userSession');
    
    if (token) {
      const decodedToken = decodeJwt(token);
      
      if (decodedToken) {
        setUserRole(decodedToken.role);
        setUserData(decodedToken as IRole); 
      } else {
        console.error('Token no válido');
      }
    } else {
      console.error('No se encontró el token');
    }
  }, []);

  return (
    <div className="flex flex-col rounded-md md:h-[200px]">
      {userRole ? (
        <div>
          {userRole === 'admin' && <Admin userData={userData} />}
          {userRole === 'agency' && <Agency userData={userData} />}
          {userRole === 'user' && <User userData={userData} />}
        </div>
      ) : (
        <div className="text-3xl font-mono font-bold">En reparación... Falta aplicar roles...</div>
      )}
    </div>
  );
};

export default MiPerfil;
