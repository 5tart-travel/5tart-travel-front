// CompraSection.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface CompraSectionProps {
  busDetails: {
    title: string;
    price: number;
    // Otros detalles si los hay
  };
}

const CompraSection: React.FC<CompraSectionProps> = ({ busDetails }) => {
  const [favorited, setFavorited] = useState<boolean>(false);

  const toggleFavorite = () => {
    setFavorited(!favorited);
    if (favorited) {
      console.log('Eliminado de favoritos');
    } else {
      console.log('Agregado a favoritos');
    }
  };

  return (
    <section>
    <div className="absolute top-0 right-0 bg-white text-center border-10 border-blue-500 rounded-lg p-12 z-10 mt-96 mr-8 shadow-lg">
    <div
        className={`absolute right-0 top-0 m-3 rounded-full p-2 cursor-pointer ${favorited ? 'bg-white text-blue-500' : 'bg-white border-2 border-black'}`}
        onClick={toggleFavorite}
      >
        <FontAwesomeIcon icon={faHeart} className={`${favorited ? 'text-blue-500' : 'text-black'}`} />
      </div>
      <h2 className="text-xl font-bold mb-4">{busDetails.title}</h2>
      <p className="text-lg mb-4">Precio: ${busDetails.price}</p>
      <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out">
        Comprar
      </button>
    </div>
  </section>);
};

export default CompraSection;
