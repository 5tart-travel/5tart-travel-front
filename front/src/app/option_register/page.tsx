import HomeButton from '@/components/ui/HomeButton';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { MdOutlineTravelExplore } from "react-icons/md";

const RegistroPage: React.FC = () => {
  return (
    <div 
      className="mx-auto p-4 bg-no-repeat bg-center bg-cover h-full" 
      style={{ backgroundImage: 'url("https://res.cloudinary.com/dia2gautk/image/upload/v1719645512/hifsflcoaegwvao2ojby.png")' }}
    >
      <div className="flex items-center mb-3 w-full h-24 bg-blue-950 rounded-lg ">
        <div className='mb-8' >
           <Logo />
        </div>
      </div>
      <div className="text-center mb-6">
        <p className="text-xl sm:text-4xl text-gray-600 font-semibold mt-9 ">¿Cómo deseas registrarte?</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-16 h-full my-4 ">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-2xl w-full sm:w-[450px] h-[300px]">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <FaUser className="text-indigo500 w-10 h-10" />
          </div>
          <p className="mb-4 text-center text-sm sm:text-lg text-gray-600 flex-grow">
            ¿Estás buscando tu próxima aventura? Regístrate en nuestra plataforma y explora una amplia variedad de paquetes de viaje ofrecidos por agencias de turismo registradas. Encuentra la experiencia perfecta para tu próximo viaje.
          </p>
          <Link href="/AUTH/register">
            <button className="bg-indigo500 text-gray-50 px-4 py-2 rounded-lg hover:bg-indigo-700 mt-auto w-full sm:w-auto shadow-xl">
              Registrarme como usuario
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-2xl w-full sm:w-[450px] h-[300px]">
          <div className="bg-lime-100 p-4 rounded-full mb-4">
            <MdOutlineTravelExplore className="text-lime500 w-10 h-10" />
          </div>
          <p className="mb-4 text-center text-sm sm:text-lg text-gray-600 flex-grow">
            ¿Eres una agencia de turismo que busca conectar a los viajeros con experiencias inolvidables? Regístrate hoy y únete a nuestra plataforma para expandir tus horizontes y llegar a más aventureros.
          </p>
          <Link href="/AUTH/agency_register">
            <button className="bg-lime500 text-gray-50 px-4 py-2 rounded-lg hover:bg-lime-700 mt-auto w-full sm:w-auto shadow-xl">
              Registrarme como agencia
            </button>
          </Link>
        </div>
      </div>
      <div className='flex justify-center'>
        <Link href={'/'}>
          <HomeButton />
        </Link>
      </div>
    </div>
  );
};

export default RegistroPage;
