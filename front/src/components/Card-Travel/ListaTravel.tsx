import React from 'react';
import { ITour } from '@/interface/ITour';
import CardTravels from './CardTravels';

interface ListaTravelProps {
  tours: ITour[];
}

const ListaTravel: React.FC<ListaTravelProps> = ({ tours }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {tours.map((tour) => (
        <CardTravels 
          key={tour.id} 
          tour={tour} 
        />
      ))}
    </div>
  );
};

export default ListaTravel;


