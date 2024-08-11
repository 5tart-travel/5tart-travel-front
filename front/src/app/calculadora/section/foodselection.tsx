import React, { useState, useEffect } from 'react';

interface FoodSelectionProps {
  selectedMeals: string[];
  handleSelectMeal: (meal: string, price: number) => void;
}

const FoodSelection: React.FC<FoodSelectionProps> = ({ selectedMeals, handleSelectMeal }) => {
  const mealPrices: { [key: string]: number } = {
    'Desayuno': 10000,
    'Almuerzo': 20000,
    'Merienda': 10000,
    'Cena': 25000,
  };

  return (
    <div className="mt-10 text-center flex-1 max-w-[50%] bg-white shadow-2xl  rounded-xl p-2.5 max-h-[70vh] overflow-y-auto">
      <h2 className="text-center text-gray-600 text-xl text-shadow-semilight font-bold leading-relaxed flex items-center justify-center gap-2 ">Selección de Comidas</h2>
      <hr className="mt-1 mb-1 " />
      <div className="mt-4 grid grid-cols-[repeat(2,18rem)] gap-2.5">
        {Object.keys(mealPrices).map((meal) => (
          <div key={meal} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedMeals.includes(meal)}
              onChange={() => handleSelectMeal(meal, mealPrices[meal])}
              className="mr-5 ml-[90px] bg-gray-300 rounded-full w-4 h-4"
            />
            <span className="flex-1 text-[14px] text-center">
              <strong>{meal}</strong>
            </span>
            <span className="bg-violet-400 text-white rounded-tl-2xl rounded-br-2xl p-1.5 text-center min-w-[80px]">
              ${mealPrices[meal].toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <h2 className="text-left text-green-600 mt-7.5 text-[0.7rem]">
        * Precio por Persona
      </h2>
    </div>
  );
  
};

export default FoodSelection;
