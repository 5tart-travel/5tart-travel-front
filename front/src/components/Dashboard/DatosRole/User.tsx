import { IRole } from '@/interface/IRole';
import React from 'react';

interface AgencyProps {
  userData: IRole | null; 
}

const User: React.FC<AgencyProps> = ({ userData }) => {
  console.log(userData);
  return (
    <div>
      {userData && (
        <div>
          <h2>Bienvenido {userData.username}</h2>
          <h2>Mail {userData.email}</h2>

        </div>
      )}
    </div>
  );
};

export default User;
