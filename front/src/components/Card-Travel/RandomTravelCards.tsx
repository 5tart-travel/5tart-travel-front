'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardTravels from './CardTravels';
import { ITravels } from '@/interface/ITravels';

const RandomTravelCards: React.FC = () => {
  const [randomTravels, setRadomTravels] = useState<ITravels[]>([]);
  const router = useRouter();

  const selectRandomTravels = (travel: ITravels[]) => {
    const shuffled = [...travel].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    selectRandomTravels(selected);
  };

  useEffect(() => {
    fetch("https://huellasdesperanza.onrender.com/pets")
      .then(response => response.json())
      .then(data => selectRandomTravels(data))
      .catch(error => console.error("Error fetching mascotas:", error));
  }, []);

  const updateTravel = (travel: ITravels) => {
    console.log('Travel actualizada:', travel);
  };

  const deleteTravel = (travelId: string) => {
    console.log('Mascota eliminada con id:', travelId);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-5 mb-5">
      {randomTravels.map((travel, index) => (
        <CardTravels 
          key={index} 
          travel={travel} 
          updateTravel={updateTravel} 
          deleteTravel={deleteTravel} 
        />
      ))}
    </div>
  );
};

export default RandomTravelCards;
