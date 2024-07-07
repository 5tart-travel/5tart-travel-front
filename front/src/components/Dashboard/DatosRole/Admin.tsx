import { IRole } from '@/interface/IRole';
import React from 'react';

interface AgencyProps {
  userData: IRole | null; 
}

const Admin: React.FC<AgencyProps> = ({ userData }) => {
  return (
    <div>
      {userData && (
        <h2>Bienvenido {userData.name_agency}</h2>
      )}
    </div>
  );
};

export default Admin;
