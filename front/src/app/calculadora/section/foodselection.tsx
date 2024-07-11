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
    <div className="mt-10 text-center" style={{ flex: '1', maxWidth: '50%', border: '2px solid #007BFF', borderRadius: '8px', padding: '10px', maxHeight: '70vh', overflowY: 'auto' }}>
      <h2 className='text-center'><strong>Selección de Comidas</strong></h2>
      <h2 className='bg-green-500 text-white mt-4 pl-4 w-full'>* Precio por Persona</h2>
      <hr className='mt-1' />
      <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {Object.keys(mealPrices).map((meal) => (
          <div key={meal}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={selectedMeals.includes(meal)}
                onChange={() => handleSelectMeal(meal, mealPrices[meal])}
              />
              <span style={{ marginLeft: '10px', fontSize: '14px' }}>
                <strong>{meal}</strong> - ${mealPrices[meal].toLocaleString()}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSelection;
