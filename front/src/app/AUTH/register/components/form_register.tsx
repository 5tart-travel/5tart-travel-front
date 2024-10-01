'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Swal from 'sweetalert2';
import HomeButton from '@/components/ui/HomeButton';
import Link from 'next/link';

interface FormData {
  username: string;
  mail: string;
  password: string;
  confirm_password: string;
  birthday: string;
}

interface Validations {
  usernameValid: boolean | null;
  emailValid: boolean | null;
  passwordValid: boolean | null;
  confirmPasswordValid: boolean | null;
  passwordStrength: string;
  birthdayValid: boolean | null;
}

const UserForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    mail: '',
    password: '',
    confirm_password: '',
    birthday: '',
  });

  const [validations, setValidations] = useState<Validations>({
    usernameValid: null,
    emailValid: null,
    passwordValid: null,
    confirmPasswordValid: null,
    passwordStrength: '',
    birthdayValid: null,
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
    if (
      hasMinLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      strength = 'Fuerte';
    } else if (
      hasMinLength &&
      (hasUppercase || hasLowercase) &&
      hasNumber &&
      hasSpecialChar
    ) {
      strength = 'Medio';
    }

    return {
      valid:
        hasMinLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar,
      strength,
    };
  };

  const validateBirthday = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'mail':
        setValidations({
          ...validations,
          emailValid: value ? validateEmail(value) : null,
        });
        break;
      case 'password':
        const passwordValidation = validatePassword(value);
        setValidations({
          ...validations,
          passwordValid: value ? passwordValidation.valid : null,
          passwordStrength: value ? passwordValidation.strength : '',
        });
        break;
      case 'confirm_password':
        setValidations({
          ...validations,
          confirmPasswordValid: value ? value === formData.password : null,
        });
        break;
      case 'username':
        setValidations({
          ...validations,
          usernameValid: value ? value.length >= 2 : null,
        });
        break;
      case 'birthday':
        setValidations({
          ...validations,
          birthdayValid: value ? validateBirthday(value) : null,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const someInvalid = Object.values(validations).some(
      (valid) => valid === false,
    );

    if (!someInvalid) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/register/user`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );

        if (response.ok) {
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Te has registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2500,
          }).then(() => {
            router.push('/AUTH/login');
          });
        } else {
          const errorData = await response.json();
          console.error('Error en la respuesta:', errorData);
          setError(
            `Error en el registro: ${errorData.message || 'Error desconocido'}`,
          );
          Swal.fire({
            title: '¡Algo salió mal!',
            text: 'Tu registro no pudo ser completado. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            timer: 3000,
          });
        }
      } catch (error) {
        console.error('Error en el registro:', error);
        setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    } else {
      setError('Por favor, completa todos los campos correctamente.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Regístrate</h2>
        <p className="text-gray-500 text-sm">
          Por favor, regístrate para poder iniciar sesión y dejar tu huella de
          esperanza.
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'username',
              placeholder: 'Nombre de Usuario',
              validation: validations.usernameValid,
              errorMessage:
                'El nombre de usuario debe tener al menos 2 caracteres.',
            },
            {
              name: 'mail',
              placeholder: 'Email',
              validation: validations.emailValid,
              errorMessage: 'Ingrese un correo electrónico válido.',
            },
            {
              name: 'password',
              placeholder: 'Contraseña',
              validation: validations.passwordValid,
              errorMessage:
                'La contraseña debe contener una mayúscula, una minúscula, un número y un carácter especial.',
              isPassword: true,
            },
            {
              name: 'confirm_password',
              placeholder: 'Confirmar Contraseña',
              validation: validations.confirmPasswordValid,
              errorMessage: 'Las contraseñas no coinciden.',
              isPassword: true,
            },
            {
              name: 'birthday',
              placeholder: 'Fecha de Nacimiento',
              validation: validations.birthdayValid,
              errorMessage: 'Debes tener al menos 18 años.',
              isDate: true,
            },
          ].map(
            ({
              name,
              placeholder,
              validation,
              errorMessage,
              isPassword = false,
              isDate = false,
            }) => (
              <div key={name} className="relative">
                <Input
                  type={isPassword ? 'password' : isDate ? 'date' : 'text'}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className={`border ${
                    validation === null
                      ? ''
                      : validation
                      ? 'border-green-500'
                      : 'border-red-500'
                  } w-full`}
                />
                {validation === false && (
                  <p className="text-red-500 text-xs">{errorMessage}</p>
                )}
                {name === 'password' && validation !== null && (
                  <p
                    className={`text-xs ${
                      validations.passwordValid
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    Fortaleza de la contraseña: {validations.passwordStrength}
                  </p>
                )}
              </div>
            ),
          )}
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
        <div className="flex justify-center">
          <Link href={'/'}>
            <HomeButton />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
