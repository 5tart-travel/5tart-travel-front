import { FaPlane, FaBus, FaHotel, FaStar, FaRegStar } from 'react-icons/fa';
import Image from 'next/image';
import './tourCard.css';
import { IBusTour } from '@/interface/IBusTour';

interface TourCardProps {
  tour: IBusTour;
  onClick: (id: string) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onClick }) => {
  function renderStars(rating: number) {
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return null;
    }

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass = 'text-yellow-500 border-white';
      let starIcon = (
        <FaStar className={`${starClass}  text-white border-white`} />
      );

      if (i > rating) {
        starIcon = (
          <FaRegStar className={`${starClass}  text-white border-white`} />
        ); // Estrella vacía
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        starIcon = (
          <FaRegStar className={`${starClass}  text-white border-white`} />
        ); // Estrella parcialmente llena
      }

      stars.push(
        <span key={i} className="text-2xl">
          {starIcon}
        </span>,
      );
    }

    return <div className="flex space-x-1">{stars}</div>;
  }

  return (
    <div
      className="relative bg-white shadow-md rounded-lg overflow-hidden p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => onClick(tour.id)}
    >
      <div className="flex flex-col relative">
        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
          {tour.oferta && (
            <div className="ribbon ribbon-top-right text-center">
              <span>Oferta</span>
            </div>
          )}

          <div className="absolute left-2 bottom-2">
            {renderStars(tour.averageRate)}
          </div>
          <Image
            className="w-full h-48 object-cover"
            src={tour.imgUrl}
            alt={`Imagen de ${tour.destino}`}
            layout="responsive"
            width={500}
            height={300}
            style={{ minWidth: '100%', minHeight: '100%' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 items-center">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-700 truncate">
            {tour.destino}
          </h2>
          <p className="text-gray-500 font-bold">
            {tour.agency.name_agency.length > 12
              ? `${tour.agency.name_agency.substring(0, 12)}...`
              : tour.agency.name_agency}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-500 flex items-center">
            {tour.transportType === 'plane' ? (
              <FaPlane className="mr-2 h-5 w-5" />
            ) : (
              <FaBus className="mr-2 h-5 w-5" />
            )}
            <p className="text-xs max-w-xs truncate">
              {tour.empresa.length > 13
                ? `${tour.empresa.substring(0, 13)}...`
                : tour.empresa}
            </p>
          </div>
          <div className="text-gray-500 flex items-center">
            <FaHotel className="mr-2 h-5 w-5 self-start" />
            <p className="text-xs max-w-xs truncate">
              {tour.hotel.length > 13
                ? `${tour.hotel.substring(0, 13)}...`
                : tour.hotel}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <p className="bg-white rounded-full border border-gray-300 shadow-md px-4 py-1 text-gray-500 text-xs text-center">
            Check-in: <br />
            {new Date(tour.fecha_ingreso).toLocaleDateString()}
          </p>
          <p className="bg-white rounded-full border border-gray-300 shadow-md px-4 py-1 text-gray-500 text-xs text-center">
            Check-out: <br />
            {new Date(tour.fecha_egreso).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-blue-950 hover:bg-blue-900 text-white font-bold text-center p-2 mt-4 rounded-md shadow-md">
          {`$${tour.price}`}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
