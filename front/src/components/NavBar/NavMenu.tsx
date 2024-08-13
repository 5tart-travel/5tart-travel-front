import Link from 'next/link';

const NavMenu: React.FC = () => {
  return (
    <nav className="relative">
      <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 text-gray-100 text-base p-4 md:p-0">
        <li className="hidden md:flex"> 
          <Link
            className="relative hover:text-blue-300 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-blue-300 after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
            href={{
              pathname: '/',
              query: { name: 'test' },
            }}
          >
            Inicio
          </Link>
        </li>
        <li className="hidden md:flex"> 
          <Link
            className="relative hover:text-blue-300 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-blue-300 after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
            href={{
              pathname: '/travel',
              query: { name: 'test' },
            }}
          >
            Viajes
          </Link>
        </li>
        <li className="hidden md:flex"> 
          <Link
            className="relative hover:text-blue-300 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-blue-300 after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
            href={{
              pathname: '/nosotros',
              query: { name: 'test' },
            }}
          >
            Acerca de la Pagina
          </Link>
        </li>
        <li className="hidden md:flex"> 
          <Link
            className="relative hover:text-blue-300 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-blue-300 after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
            href={{
              pathname: '/calculadora',
              query: { name: 'test' },
            }}
          >
            Calcula tu Aventura
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
