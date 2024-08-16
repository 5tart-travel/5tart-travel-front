'use client';
import NavLinksAdmin from './nav_links';
import { FaPowerOff } from 'react-icons/fa';

const SideNavAdmin: React.FC = () => {
  const handleSignOut = () => {
    localStorage.removeItem('userSession');
    window.location.href = '/';
  };

  return (
    <div className='  bg-gray-50  box-shadow-white-medium' >
    <div className="flex flex-col h-full px-2 w-48 py-2 md:px-2 z-0  ">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinksAdmin />
        <form className="w-full">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-[48px] w-full mb-[180px] items-center justify-center gap-2 rounded-md bg-white rounded-br-3xl rounded-tl-3xl shadow-xl p-3 text-sm font-medium hover:bg-indigo-200 hover:text-indigo-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <FaPowerOff className="w-6" />
            <div className="hidden md:block  ">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SideNavAdmin;
