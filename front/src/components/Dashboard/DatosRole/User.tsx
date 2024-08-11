import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IRole } from '@/interface/IRole';

interface UserProps {
  userData: IRole | null;
}

const User: React.FC<UserProps> = ({ userData }) => {
  const [username, setUsername] = useState(userData?.username || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);

  useEffect(() => {
    if (userData) {
      setButtonsDisabled(false);
    } else {
      setButtonsDisabled(true);
    }
  }, [userData]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSave = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Para guardar los cambios deberá volver a iniciar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = JSON.parse(
            localStorage.getItem('userSession') || '{}',
          ).token;
          const response = await fetch(
            'https://fivetart-travel-kafg.onrender.com/user/profile',
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ username }),
            },
          );

          if (response.ok) {
            setMessage('Nombre actualizado con éxito.');
            localStorage.removeItem('userSession');
            window.location.href = '/AUTH/login';
          } else {
            setMessage('Hubo un error al actualizar el nombre.');
          }
        } catch (error) {
          setMessage('Hubo un error al actualizar el nombre.');
          console.error(error);
        }

        setDisabled(true);

        setTimeout(() => {
          setDisabled(false);
        }, 60000);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    window.location.href = '/AUTH/login';
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1 className="text-3xl font-semibold">Información personal</h1>
          <p className="text-sm mt-4 text-gray-500">
            Te has registrado en 5tar-Travel, acá podrás editar la información
            de tu cuenta.
          </p>
          <hr className="mt-4" />
          <div className="mt-4 flex items-center">
            <p className="font-semibold w-32">Tu nombre:</p>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="border border-gray-300 rounded-md p-2"
              disabled={disabled}
            />
          </div>
          <p className="text-xs mt-2 text-gray-400 ml-32">
            Usa tu nombre real.
          </p>
          <p className="text-xs mt-2 text-gray-400 ml-32">{message}</p>
          <hr className="mt-4" />
          <div className="mt-4 flex items-center">
            <p className="font-semibold w-32">Tu email:</p>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 bg-gray-100 rounded-md p-2 text-gray-500"
              disabled
            />
          </div>
          <p className="text-xs mt-2 text-gray-400 ml-32">
            Te enviaremos mails con las mejores ofertas para vos.
          </p>
          <hr className="mt-4" />
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-950 text-white p-2 rounded-xl hover:bg-blue-800"
            disabled={buttonsDisabled || disabled}
          >
            Guardar
          </button>
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
