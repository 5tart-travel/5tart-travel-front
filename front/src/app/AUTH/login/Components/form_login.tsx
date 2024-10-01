'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import ButtonGoogle from '@/components/ui/ButtonGoogle';
import { checkUserRole } from '@/utils/decodeJwt';

const Form_Login: React.FC = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({ mail: '', password: '' });
  const [errorData, setErrorData] = useState({ mail: '', password: '' });
  const [mailValid, setMailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateMail = (mail: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(mail);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mail = event.target.value;
    setUserData({ ...userData, mail });
    if (mail === '') {
      setMailValid(null);
      setErrorData({ ...errorData, mail: '' });
    } else if (validateMail(mail)) {
      setMailValid(true);
      setErrorData({ ...errorData, mail: '' });
    } else {
      setMailValid(false);
      setErrorData({
        ...errorData,
        mail: 'Ingrese un correo electrónico válido.',
      });
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setUserData({ ...userData, password });
    if (password === '') {
      setPasswordValid(null);
      setErrorData({ ...errorData, password: '' });
    } else if (validatePassword(password)) {
      setPasswordValid(true);
      setErrorData({ ...errorData, password: '' });
    } else {
      setPasswordValid(false);
      setErrorData({
        ...errorData,
        password: 'La contraseña debe tener al menos 6 caracteres.',
      });
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateMail(userData.mail) || !validatePassword(userData.password)) {
      setError('Por favor, corrige los errores en el formulario.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        } else if (response.status === 418) {
          throw new Error("I'm a teapot");
        } else {
          throw new Error('Error al iniciar sesión');
        }
      }

      const data = await response.json();
      const { token } = data;
      localStorage.setItem('userSession', JSON.stringify({ token }));

      const role = checkUserRole();
      let redirectTo = '/';
      if (role === 'admin') {
        redirectTo = '/admin';
      }

      Swal.fire({
        title: '¡Inicio de sesión exitoso!',
        text: 'Te has logeado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 2000,
      }).then(() => {
        router.push(redirectTo);
      });
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);

      let errorMessage =
        'Hubo un error al iniciar sesión. Por favor, inténtalo nuevamente.';
      let errorTitle = '¡Error!';
      let errorIcon: SweetAlertIcon = 'error';
      let timerAlert = 3000;

      if (error && error.message) {
        if (error.message === 'Unauthorized') {
          errorMessage =
            'Las credenciales proporcionadas son incorrectas.\nPor favor, verifica tu usuario y contraseña e intenta nuevamente.';
          errorTitle = 'Error de Autenticación';
          timerAlert = 4000;
        } else if (error.message === "I'm a teapot") {
          errorMessage =
            'Esta cuenta se encuentra inactiva. Por favor, aguarde hasta recibir el correo de activación y vuelva a intentarlo.';
          errorTitle = 'Cuenta Inactiva';
          errorIcon = 'info';
          timerAlert = 4000;
        }
      }

      Swal.fire({
        title: errorTitle,
        text: errorMessage,
        icon: errorIcon,
        confirmButtonText: 'Aceptar',
        timer: timerAlert,
        customClass: {
          popup: 'max-w-md w-full p-4 bg-white rounded-lg shadow-lg',
          title: 'text-xl font-bold text-gray-700',
          confirmButton: 'bg-green-500 text-white rounded px-4 py-2 mt-2',
        },
      });
    }
  };

  const handleGoogleLogin = async () => {
    const hasConfirmed = localStorage.getItem('googleLoginConfirmed');

    if (hasConfirmed) {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google`;
    } else {
      Swal.fire({
        title: '¡Advertencia!',
        html: `El acceso con Google te proporcionará una cuenta de usuario (no de agencia).<br><br>¿Desea continuar?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Continuar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          localStorage.setItem('googleLoginConfirmed', 'true');
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google`;
        }
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Bienvenido, ingresa!</h2>
        <p className="text-yellow500 text-sm">
          Por favor, ingresa tu mail y contraseña para entrar en la aplicación
        </p>
      </div>
      <form className="w-full" onSubmit={handleLogin}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="relative">
          <Input
            type="text"
            name="mail"
            placeholder="Email"
            value={userData.mail}
            onChange={handleMailChange}
            className={`w-full ${
              mailValid === false
                ? 'border-red-500'
                : mailValid === true
                ? 'border-green-500'
                : ''
            }`}
            isValid={mailValid}
          />
          {mailValid === false && (
            <p className="text-red-500 text-xs">
              Ingrese un correo electrónico válido.
            </p>
          )}
        </div>
        <div className="relative mt-4">
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={userData.password}
            onChange={handlePasswordChange}
            className={`w-full ${
              passwordValid === false
                ? 'border-red-500'
                : passwordValid === true
                ? 'border-green-500'
                : ''
            }`}
            isValid={passwordValid}
          />
          {passwordValid === false && (
            <p className="text-red-500 text-xs">
              La contraseña debe tener al menos 6 caracteres.
            </p>
          )}
        </div>
        <div className="flex justify-end mb-5">
          <button
            type="button"
            onClick={() => router.push('/AUTH/forgot_password')}
            className="text-yellow500 hover:text-indigo-500 transition-colors duration-300"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <Button type="submit" label="Ingresar" />
        <div className="mt-5 mb-10 flex flex-col items-center justify-center gap-y-2">
          <ButtonGoogle
            type="button"
            label="Ingresar con Google"
            onClick={handleGoogleLogin}
            className={''}
          />
        </div>
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-yellow500">¿No tienes una cuenta?</p>
          <button
            type="button"
            onClick={() => router.push('/option_register')}
            className="font-semibold hover:text-indigo-500 transition-colors duration-300"
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form_Login;
