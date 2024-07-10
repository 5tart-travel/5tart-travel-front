import { IRole } from '@/interface/IRole';
import React, { useState } from 'react';

interface AgencyProps {
  userData: IRole | null;
}

const Agency: React.FC<AgencyProps> = ({ userData }) => {
  const [agencyName, setAgencyName] = useState(userData?.name_agency || '');
  const [contactEmail, setContactEmail] = useState(userData?.email || '');
  const [address, setAddress] = useState(userData?.address || '');

  const handleAgencyNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAgencyName(event.target.value);
  };

  const handleContactEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setContactEmail(event.target.value);
  };

  const handleContactAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddress(event.target.value);
  };
  console.log(userData?.name_agency);
  console.log(userData);

  return (
    <div>
      {userData ? (
        <div>
          <h1 className="text-3xl font-semibold">Información personal</h1>
          <p className="text-sm mt-4 text-gray-500">
            Aquí puedes editar la información de tu agencia.
          </p>
          <hr className="mt-4" />
          <div className="mt-4 flex items-center">
            <p className="font-semibold w-32">Nombre de Agencia:</p>
            <input
              type="text"
              value={agencyName}
              onChange={handleAgencyNameChange}
              className="border border-gray-300 rounded-md p-2 "
            />
          </div>
          <p className="text-xs mt-2 text-gray-400 ml-32">
            Ingresa el nombre completo de tu agencia.
          </p>
          <br />
          <hr className="mt-4" />
          <div className="mt-4 flex items-center">
            <p className="font-semibold w-32">Email de contacto:</p>
            <input
              type="email"
              value={contactEmail}
              onChange={handleContactEmailChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <p className="text-xs mt-2 text-gray-400 ml-32">
            Ingresa un email válido de contacto.
          </p>

          <hr className="mt-4" />
          <div className="mt-4 flex items-center">
            <p className="font-semibold w-32">Dirección:</p>
            <input
              placeholder="Córdoba 123, Ciudad "
              type="text"
              value={address}
              onChange={handleContactAddressChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <p className="text-xs mt-2 text-gray-400 ml-32">
            Ingresa una dirección válida.
          </p>
          <br />
          <hr className="mt-4" />
        </div>
      ) : (
        <div>
          <h2>No hay información de agencia disponible</h2>
        </div>
      )}
    </div>
  );
};

export default Agency;
