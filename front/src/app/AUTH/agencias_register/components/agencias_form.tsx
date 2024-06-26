'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Swal from 'sweetalert2';
import HomeButton from '@/components/ui/HomeButton';
import Link from 'next/link';

interface FormData {
  name_agency: string;
  mail: string;
  password: string;
  confirm_password: string;
  address: string;
}

const AgencyForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name_agency: '',
    mail: '',
    password: '',
    confirm_password: '',
    address: ''
  });

  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    let strength = 'Débil';
    if (hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      strength = 'Fuerte';
    } else if (hasMinLength && (hasUppercase || hasLowercase) && hasNumber && hasSpecialChar) {
      strength = 'Medio';
    }
  
    return {
      valid: hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      strength,
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!validateEmail(formData.mail)) {
      setError('Correo electrónico no válido.');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      setError('La contraseña no cumple con los requisitos.');
      return;
    }

    try {
      const response = await fetch('https://fivetart-travel.onrender.com/auth/agency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      

      if (response.ok) {
        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Tu agencia se ha registrado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          timer: 2500
        }).then(() => {
          router.push('/AUTH/login');
        });
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        setError(`Error en el registro: ${errorData.message || 'Error desconocido'}`);
        Swal.fire({
          title: "¡Algo salió mal!",
          text: "Tu agencia no pudo ser registrada. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
          timer: 3000,
        });
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Registra tu agencia</h2>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'name_agency', placeholder: 'Nombre de la agencia' },
            { name: 'mail', placeholder: 'Correo electrónico' },
            { name: 'password', placeholder: 'Contraseña', isPassword: true },
            { name: 'confirm_password', placeholder: 'Confirmar contraseña', isPassword: true },
            { name: 'address', placeholder: 'Dirección', fullWidth: true }
          ].map(({ name, placeholder, isPassword = false, fullWidth = false }) => (
            <div key={name} className={`relative ${fullWidth ? 'col-span-2' : ''}`}>
              <Input
                type={isPassword ? 'password' : 'text'}
                name={name}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="border w-full"
              />
            </div>
          ))}
        </div>

        <Button type="submit" label="Crear cuenta" className="w-full mt-4" />
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-yellow500">¿Tienes una cuenta?</p>
          <button
            type="button"
            onClick={() => router.push('/AUTH/login')}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Iniciar sesión
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

export default AgencyForm;

