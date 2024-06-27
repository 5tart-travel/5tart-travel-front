'use client'
import { useRouter } from 'next/navigation';

const PackBus: React.FC = () => {
  const router = useRouter();

  //?Acá remplazamos por la llamada a la API
  const buses = [
    { id: 1, destino:'Mar del Plata',date: 'Mar. 30/07/2024', duration: '10 horas', type: 'directos', price: '$200.920', agency: 'Coppel' },
    { id: 2, destino:'Mar del Plata',date: 'Vie. 26/07/2024', duration: '10 horas', type: 'directos', price: '$201.848', agency: 'Volaris' },
    { id: 3, destino:'Chile',date: 'Sáb. 20/07/2024', duration: '10 horas', type: 'directos', price: '$202.776', agency: 'ADO' },
    { id: 4, destino:'Chile',date: 'Jue. 25/07/2024', duration: '10 horas', type: 'directos', price: '$202.776', agency: 'Andes Mar' },
    { id: 5, destino:'Mar del Plata',date: 'Dom. 28/07/2024', duration: '10 horas', type: 'directos', price: '$203.704', agency: 'ETN' },
    { id: 6, destino:'San Carlos',date: 'Jue. 25/07/2024', duration: '18 horas', type: 'con escalas', price: '$204.128', agency: 'Futura' },
    { id: 7, destino:'Patagones',date: 'Mié. 31/07/2024', duration: '13 horas', type: 'directos', price: '$205.624', agency: 'CATA' },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/travel/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-500 font-bold mb-4 text-center">Pack Bus</h1>
      <div className="grid grid-cols-6 items-center">
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Destino</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Fecha</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Duración</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Escala</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Agencia</p>
        <p className="text-blue-500 mb-4 font-semibold border-b-3">Precio</p>
      </div>
      <div className="space-y-4">
        {buses.map((bus) => (
          <div 
            key={bus.id} 
            className="bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg overflow-hidden p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleCardClick(bus.id)}
          >
            <div className="grid grid-cols-6 items-center">
              <div className="text-gray-500">{bus.destino}</div>
              <div className="text-gray-500">{bus.date}</div>
              <div className="text-gray-500">{bus.duration}</div>
              <div className="text-gray-500">{bus.type}</div>
              <div className="text-lime500">{bus.agency}</div>
              <div className="text-blue-500 font-bold flex items-center justify-between">
                {bus.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackBus;
