

import React from 'react';
import { ITravels } from '@/interface/ITravels';
import CardTravels from './CardTravels';

interface ListaTravelProps {
  travel: ITravels[];
  updateTravel: (updatedTravel: ITravels) => void;
  deleteTravel: (travelId: string) => void;
}

const ListaTravel: React.FC<ListaTravelProps> = ({ travel, updateTravel, deleteTravel }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {travel.map((travel) => (
        <CardTravels 
          key={travel.id} 
          travel={travel} 
          updateTravel={updateTravel} 
          deleteTravel={deleteTravel}
        />
      ))}
    </div>
  );
};

export default ListaTravel;
