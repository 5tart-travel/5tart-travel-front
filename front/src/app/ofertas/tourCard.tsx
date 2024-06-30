import { IBusTour } from '@/interface/IBusTour';
import { FaPlane, FaBus, FaHotel } from 'react-icons/fa';

interface TourCardProps {
    tour: IBusTour;
    onClick: (id: string) => void;  
}

const TourCard: React.FC<TourCardProps> = ({ tour, onClick }) => {
    return (
        <div 
            className="relative bg-white shadow-md rounded-lg overflow-hidden p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => onClick(tour.id)}  
        >
            <img className="w-full h-48 object-cover rounded-lg mb-4" src={tour.imgUrl} alt={`Imagen de ${tour.destino}`} />
            {tour.oferta && (
                <div className="absolute top-0 left-0 bg-blue-500 text-white font-bold py-1 px-3 rounded-full">
                    Oferta
                </div>
            )}
            <div className="grid grid-cols-1 items-center">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-700 truncate">{tour.destino}</h2>
                    <p className="text-gray-500 font-bold">{tour.agency.name_agency}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-gray-500 flex items-center">
                        {tour.transportType === 'plane' ? <FaPlane className="mr-2 h-5 w-5" /> : <FaBus className="mr-2 h-5 w-5" />}
                        <p className="text-xs max-w-xs truncate">{tour.empresa}</p>
                    </div>
                    <div className="text-gray-500 flex items-center">
                        <FaHotel className="mr-2 h-5 w-5 self-start" />
                        <p className="text-xs max-w-xs truncate">{tour.hotel}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <p className="bg-white rounded-full border border-gray-300 shadow-md px-4 py-1 text-gray-500 text-xs text-center">
                        Check-in: {new Date(tour.fecha_ingreso).toLocaleDateString()}
                    </p>
                    <p className="bg-white rounded-full border border-gray-300 shadow-md px-4 py-1 text-gray-500 text-xs text-center">
                        Check-out: {new Date(tour.fecha_egreso).toLocaleDateString()}
                    </p>
                </div>
                <div className="bg-blue-500 text-white font-bold text-center p-2 mt-4 rounded-md shadow-md">
                    {`$${tour.price}`}
                </div>
            </div>
        </div>
    );
};

export default TourCard;
