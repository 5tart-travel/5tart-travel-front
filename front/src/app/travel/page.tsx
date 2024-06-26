'use client'
import React, { useState, useEffect } from 'react';
import { ITour } from '@/interface/ITour';
import ListaTravel from '@/components/Card-Travel/ListaTravel';


const Travel = () => {
  const [tours, setTours] = useState<ITour[]>([]);

  useEffect(() => {
    fetch('https://fivetart-travel.onrender.com/tours')
      .then(response => response.json())
      .then((data: ITour[]) => setTours(data))
      .catch(error => console.error('Error fetching tours:', error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Lista de Tours</h1>
      <div className="mt-4">
        <ListaTravel tours={tours} />
      </div>
    </div>
  );
};

export default Travel;