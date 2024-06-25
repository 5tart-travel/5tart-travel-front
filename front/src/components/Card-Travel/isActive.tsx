import { ITravels } from '@/interface/ITravels';
import CardTravels from './CardTravels';
import { useEffect, useState } from 'react';

const isActive: React.FC = () => {
  const [travels, setTravels] = useState<ITravels[]>([]);

  useEffect(() => {
    fetch('https://huellasdesperanza.onrender.com/pets')
      .then(response => response.json())
      .then(data => setTravels(data))
  }, []);

  const updateTravel = (updateTravel: ITravels) => {
    setTravels(prevTravels =>
      prevTravels.map(travel =>
        travel.id === updateTravel.id ? updateTravel : travel
      )
    );
  };

  const deleteTravel = (travelId: string) => {
    setTravels(preTravels =>
      preTravels.filter(travel => travel.id !== travelId)
    );
  };

  const activeTravels = travels.filter(travel => travel.isActive);

  return (
    <div className="animal-list">
      {activeTravels.map(travel => (
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

export default isActive;
