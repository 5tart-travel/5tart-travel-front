'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Swal from 'sweetalert2';
import HomeButton from '@/components/ui/HomeButton';
import Link from 'next/link';

const Form_Register: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    mail: '',
    password: '',
    confirm_password: '',
    birthday: ''
  });

  const [formValidations, setFormValidations] = useState({
    usernameValid: null,
    mailValid: null,
    passwordValid: null,
    confirm_passwordValid: null,
    birthdayValid: null
  });

  const [error, setError] = useState<string | null>(null);

  const validateFields = {
    username: (value: string) => /^[a-zA-Z\s]{1,50}$/.test(value),
    mail: (value: string) => /\S+@\S+\.\S+/.test(value),
    password: (value: string) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(value),
    confirm_password: (value: string) => value === formData.password,
    birthday: (value: string) => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const validationKey = name;
    setFormValidations(prev => ({
      ...prev,
      [`${validationKey}Valid`]: value === '' ? null : validateFields[name as keyof typeof validateFields](value)
    }));
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    const allValid = Object.values(formValidations).every(Boolean);
    if (!allValid) {
      setError('Por favor, completa todos los campos correctamente.');
      Swal.fire({
        title: "¡Error!",
        text: "Por favor, completa todos los campos correctamente.",
        icon: "error",
        confirmButtonText: "Entendido",
        timer: 2000,
        customClass: {
          popup: 'max-w-md w-full p-4 bg-white rounded-lg shadow-lg',
          title: 'text-xl font-bold text-gray-700',
          confirmButton: 'bg-green-500 text-white rounded px-4 py-2 mt-2'
        }
      });
      console.log('Validation failed', formValidations);
      return;
    }

    console.log('Datos a enviar:', formData);

    try {
      const response = await fetch('https://fivetart-travel.onrender.com/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(`Registro fallido. Por favor, inténtalo de nuevo. Detalles: ${errorMessage}`);
        Swal.fire({
          title: "¡Error!",
          text: `Registro fallido. Por favor, inténtalo de nuevo. Detalles: ${errorMessage}`,
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 2000,
          customClass: {
            popup: 'max-w-md w-full p-4 bg-white rounded-lg shadow-lg',
            title: 'text-xl font-bold text-gray-700',
            confirmButton: 'bg-green-500 text-white rounded px-4 py-2 mt-2'
          }
        });
        console.error('Error al registrar:', errorMessage);
        return;
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        data = null;
      }

      console.log('Registro exitoso:', data);

      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Te has registrado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 2000
      }).then(() => {
        router.push('/AUTH/login');
      });

    } catch (error) {
      let errorMessage = 'Ocurrió un error desconocido. Por favor, inténtalo de nuevo.';
      
      if (error instanceof Error) {
        errorMessage = `Ocurrió un error. Por favor, inténtalo de nuevo. Detalles: ${error.message}`;
      }
      
      setError(errorMessage);
      Swal.fire({
        title: "¡Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
        timer: 2000
      });
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className='w-full max-w-md'>
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold'>Regístrate</h2>
        <p className='text-yellow500 text-sm'>
          Por favor, regístrate para poder iniciar sesión.
        </p>
      </div>
      <form className='w-full' onSubmit={handleRegister}>
        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {['username', 'mail', 'password', 'confirm_password', 'birthday'].map((field) => (
            <div key={field} className="relative col-span-2 sm:col-span-1">
              <Input
                type={field === 'password' || field === 'confirm_password' ? 'password' : field === 'birthday' ? 'date' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className={`border-2 w-full ${
                  formValidations[`${field}Valid` as keyof typeof formValidations] === null
                    ? ''
                    : formValidations[`${field}Valid` as keyof typeof formValidations]
                    ? 'border-green-500'
                    : 'border-red-500'
                }`}
              />
              {formValidations[`${field}Valid` as keyof typeof formValidations] === false && (
                <p className="text-red-500 text-xs">
                  {field === 'username' ? 'El nombre de usuario no puede estar vacío, máximo 50 caracteres. Solo letras y espacios.' : ''}
                  {field === 'mail' ? 'Ingrese un correo electrónico válido.' : ''}
                  {field === 'password' ? 'La contraseña debe tener al menos 8 caracteres entre ellos, al menos una: mayúscula, minúscula, número, carácter especial.' : ''}
                  {field === 'confirm_password' ? 'La contraseña no coincide.' : ''}
                  {field === 'birthday' ? 'Debes ser mayor de 18 años.' : ''}
                </p>
              )}
            </div>
          ))}
        </div>
        <Button type='submit' label='Crear cuenta' className='w-full mt-4' />
        <div className='mt-5 mb-10 flex items-center justify-center gap-x-2'>
          <p className='text-yellow500'>¿Tienes una cuenta?</p>
          <button
            type='button'
            onClick={() => router.push('/AUTH/login')}
            className='font-semibold hover:text-primary transition-colors duration-300'
          >
            Inicia sesión
          </button>
        </div>
        <div className='flex justify-center'>
          <Link href={'/'}>
            <HomeButton />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form_Register;




