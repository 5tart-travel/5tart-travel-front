import { IRole } from '@/interface/IRole';
import React, { useState } from 'react';

interface AgencyProps {
  userData: IRole | null; 
}

const User: React.FC<AgencyProps> = ({ userData }) => {
  const [username, setUsername] = useState(userData?.username || '');
  const [email, setEmail] = useState(userData?.email || '');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1 className='text-3xl font-semibold'>Información personal</h1>
          <p className='text-sm mt-4 text-gray-500'>Te has registrado en 5tar-Travel, acá podrás editar la información de tu cuenta.</p>
          <hr className='mt-4'/>
          <div className='mt-4 flex items-center'>
            <p className='font-semibold w-32'>Tu nombre:</p>
            <input
              type='text'
              value={username}
              onChange={handleUsernameChange}
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <p className='text-xs mt-2 text-gray-400 ml-32'>Usa tu nombre real.</p>
          <hr className='mt-4'/>
          <div className='mt-4 flex items-center'>
            <p className='font-semibold w-32'>Tu email:</p>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className='border border-gray-300 rounded-md p-2'
            />
          </div>
          <p className='text-xs mt-2 text-gray-400 ml-32'>Te enviaremos mails con las mejores ofertas para vos.</p>
          <hr className='mt-4'/>
        </div>
      ) : (
        <div>
          <h2>No hay información de usuario disponible</h2>
        </div>
      )}
    </div>
  );
};

export default User;
