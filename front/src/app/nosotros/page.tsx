
// import QuienesSomos from "@/components/QuienesSomos/QuienesSomos";



// const nosotros = () => {
//   return (
//     <div>
//         <QuienesSomos/>
//     </div>
    
//   );
// }

// export default nosotros

import React from 'react';
import Link from 'next/link';
import './nostros.css'; // Asegúrate de que este archivo contiene la animación del avión

const Nosotros: React.FC = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-gray-100 rounded-lg overflow-hidden p-4 w-full h-[400px] max-w-2xl relative shadow-2xl">
        <div className="airplane"></div> {/* Aquí se coloca la animación del avión */}
        <h2 className="flex justify-center text-gray-600 mt-[100px] text-3xl font-bold mb-4">Página en desarrollo</h2>
        <p className='flex justify-center text-gray-600'>Esta página está actualmente en desarrollo. Por favor, vuelve más tarde.</p>
        <Link href={'/'}>
          <h1 className="flex justify-center text-orange-600 hover:text-orange-500 mt-[100px] text-3xl font-bold mb-4 cursor-pointer">GO BACK</h1>
        </Link>
      </div>
    </div>
  );
}

export default Nosotros;
