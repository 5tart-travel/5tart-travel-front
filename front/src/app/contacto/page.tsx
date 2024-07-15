'use client'
import ContactoUi from "@/components/ContactoUi/ContactoUi";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Footer from "@/components/Footer/Footer"; 
import Swal from "sweetalert2";

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    telefono: '',
    mail: '',
    message: ''
  });

  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      const session = JSON.parse(userSession);
      if (session.token) {
        setIsUserLoggedIn(true);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isUserLoggedIn) {
      Swal.fire('Debes estar logueado para enviar un mensaje.');
      router.push('/AUTH/login');
      return;
    }

    try {
      await axios.post('https://fivetart-travel-kafg.onrender.com/contact', formData); 
      Swal.fire('Formulario enviado con éxito');
    } catch (error) {
      Swal.fire('Hubo un error al enviar el formulario');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="relative w-full h-[300px] lg:h-[400px] md:h-[400px] sm:h-[300px]">
        <Image
          src="https://res.cloudinary.com/dia2gautk/image/upload/v1720054222/woman-is-standing-beautiful-tropical-beach-gazing-vast-ocean_brbbpx.webp"
          alt="logo"
          className="object-cover w-full h-full"
          fill
          priority={true}
        />
        <div className="absolute top-10 sm:top-2 right-10 sm:right-2 text-left p-4 max-w-xl sm:max-w-full md:top-14 md:right-7 lg:top-16 lg:right-9">
          <p className="text-lg mt-2 text-gray-50 text-shadow-semidark sm:text-sm sm:mt-1 md:text-lg lg:text-xl">
            ¿Listo para explorar nuevos horizontes?
          </p>
          <h1 className="text-5xl font-bold text-gray-50 text-shadow-semidark sm:text-xl md:text-5xl lg:text-5xl">
            Contáctanos hoy mismo
          </h1>
          <p className="text-lg mt-2 text-gray-50 text-shadow-semidark sm:text-sm sm:mt-1 md:text-lg lg:text-xl">
            y planifica tu próxima aventura. <br /> ¡Vive experiencias inolvidables con nosotros!
          </p>
          <Link href="/">
            <button className="mt-4 px-6 py-3 bg-blue-950 rounded-xl hover:bg-blue-900 shadow-xl text-white sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block relative top-[-10px] left-1/2 transform -translate-x-1/2 w-full">
        <ContactoUi />
      </div>
      <div className="container mx-auto px-4 py-24 w-[700px] my-10">
        <form className="flex flex-col space-y-4 mt-8" onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-500">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-50 mt-1 p-2 block w-full border-0 border-b-3 border-gray-400 focus:ring-0 focus:border-lime500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="mt-1 p-2 block w-full border-0 border-b-3 border-gray-400 bg-gray-50 focus:ring-0 focus:border-lime500"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="mail" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              className="mt-1 p-2 block w-full border-0 border-b-3 border-gray-400 bg-gray-50 focus:ring-0 focus:border-lime500"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Mensaje <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="mt-1 p-2 block w-full border-0 border-b-3 border-gray-400 bg-gray-50 focus:ring-0 focus:border-lime500"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <Footer className="w-full" username={null} tema={null} />
    </div>
  );
};

export default Contacto;
