import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Contador from '@/components/TravelDetail/Contador';
import { checkUserRole } from '@/utils/decodeJwt';

interface CompraSectionProps {
  busDetails: {
    id: string;
    title: string;
    price: number;
  };
  tourId: string;
}

const CompraSection: React.FC<CompraSectionProps> = ({
  busDetails,
  tourId,
}) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>(busDetails.price);

  const userRole = checkUserRole();

  useEffect(() => {
    // Obtener token de autenticación
    const userSessionString: any = localStorage.getItem('userSession');
    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const ntoken = userSession.token;
      setToken(ntoken);
      console.log('Token obtenido en useEffect:', ntoken);
    }

    // Obtener el estado de favoritos desde localStorage
    const favoritedToursString = localStorage.getItem('favoritedTours');
    if (favoritedToursString) {
      const favoritedTours = JSON.parse(favoritedToursString);
      setFavorited(favoritedTours.includes(tourId));
    }
  }, [tourId]);

  const toggleFavorite = async () => {
    try {
      const url = `https://fivetart-travel-kafg.onrender.com/user/tour/favorite/${tourId}`;
      if (favorited) {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Eliminado de favoritos');
      } else {
        await axios.post(url, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Agregado a favoritos');
      }

      // Actualizar el estado y localStorage
      setFavorited(!favorited);
      const favoritedToursString = localStorage.getItem('favoritedTours');
      let favoritedTours = favoritedToursString
        ? JSON.parse(favoritedToursString)
        : [];
      if (!favorited) {
        favoritedTours.push(tourId);
      } else {
        favoritedTours = favoritedTours.filter((id: string) => id !== tourId);
      }
      localStorage.setItem('favoritedTours', JSON.stringify(favoritedTours));
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
      alert('Error al actualizar favoritos');
    }
  };

  const handleCheckout = async () => {
    try {
      const responss = await fetch(
        `https://fivetart-travel-kafg.onrender.com/order/${busDetails.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const response = await axios.post(
        'https://fivetart-travel-kafg.onrender.com/mercado-pago',
        {
          title: busDetails.title,
          price: totalPrice,
        },
      );
      const data = response.data;

      if (data) {
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.async = true;
        script.onload = () => {
          const mp = new window.MercadoPago(
            'TEST-5423250e-6e54-4e3b-a21b-160a1653fc7a',
            {
              locale: 'es-AR',
            },
          );
          mp.checkout({
            preference: {
              id: data,
            },
            autoOpen: true,
          });
        };
        document.body.appendChild(script);
      } else {
        alert('Error al crear la preferencia de pago');
      }
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      alert('Error al crear la preferencia de pago');
    }
  };

  useEffect(() => {
    setTotalPrice(busDetails.price * peopleCount);
  }, [busDetails.price, peopleCount]);

  const handleQuantityChange = (newQuantity: number) => {
    setPeopleCount(newQuantity);
  };
  if (userRole === 'agency') {
    return null;
  }

  return (
    <section>
      <div className="absolute top-0 right-0 bg-white text-center border-4 md:border-10 border-blue-500 rounded-lg p-6 md:p-12 z-10 mt-24 md:mt-80 mr-4 md:mr-8 shadow-lg">
        <div
          className={`absolute right-0 top-0 m-2 rounded-full p-1 cursor-pointer ${
            favorited
              ? 'bg-white text-blue-500'
              : 'bg-white border-2 border-black'
          }`}
          onClick={toggleFavorite}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${favorited ? 'text-blue-500' : 'text-black'}`}
          />
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
          {busDetails.title}
        </h2>
        <p className="text-sm md:text-md mb-2 md:mb-4">
          Precio por persona: ${busDetails.price}
        </p>
        <div className="mb-2 md:mb-4 flex-col items-center justify-center">
          <label
            htmlFor="peopleCount"
            className="text-sm md:text-md mb-1 mr-1 md:mr-2"
          >
            Cantidad de personas:
          </label>
          <Contador
            quantity={peopleCount}
            onQuantityChange={handleQuantityChange}
          />
          <span className="text-green-500 ml-1"></span>
        </div>
        <p className="text-sm md:text-md mb-2 md:mb-4">
          Precio total: ${totalPrice.toLocaleString('es-ES')}
        </p>

        <button
          onClick={handleCheckout}
          className="bg-blue-950 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-900 hover:text-white transition duration-300 ease-in-out"
        >
          Comprar
        </button>
        <p className="text-xs text-green-500 mt-2">
          * Menores de 2 años no abonan.
        </p>
      </div>
    </section>
  );
};

export default CompraSection;
