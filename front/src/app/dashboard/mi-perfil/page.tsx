'use client'
import { decodeJwt } from '@/utils/decodeJwt';
import React, { useEffect, useState } from 'react';

const MiPerfil = () => {
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userSession');
    // console.log(token);
    
    if (token) {
      const decodedToken = decodeJwt(token);
      
      if (decodedToken) {
        setUserRole(decodedToken.role); 
        setUserData(decodedToken);
      } else {
        console.error('Token no válido');
      }
    } else {
      console.error('No se encontró el token');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-red-300 rounded-md md:h-[200px]">
      {userRole ? (
        <div className="text-3xl font-mono font-bold">
          {userRole === 'admin' && <div>Bienvenido Admin. Tus datos: {JSON.stringify(userData)}</div>}
          {userRole === 'agency' && <div>Bienvenido Agencia. Tus datos: {(userData.name_agency)}</div>}
          {userRole === 'user' && <div>Bienvenido Usuario. Tus datos: {JSON.stringify(userData)}</div>}
        </div>
      ) : (
        <div className="text-3xl font-mono font-bold">En reparación... Falta aplicar roles...</div>
      )}
    </div>
  );
};

export default MiPerfil;
