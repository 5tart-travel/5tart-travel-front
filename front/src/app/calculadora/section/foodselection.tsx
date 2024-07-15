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
    <div className="mt-10 text-center" style={{ flex: '1', textAlign: 'center', maxWidth: '50%', border: '2px solid #172554', borderRadius: '8px', padding: '10px', maxHeight: '70vh', overflowY: 'auto' }}>
      <h2 className='text-center mb-3'><strong>Selección de Comidas</strong></h2>
      <hr className='mt-1 mb-1' />     
        <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 18rem)', gap: '10px' }}>
          {Object.keys(mealPrices).map((meal) => (
            <div key={meal} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={selectedMeals.includes(meal)}
                onChange={() => handleSelectMeal(meal, mealPrices[meal])}
                style={{ marginRight: '20px',marginLeft:'90px',backgroundColor:'#172554' }}
              />
              <span style={{ flex: 1, fontSize: '14px', textAlign: 'center' }}>
                <strong>{meal}</strong>
              </span>
              <span style={{ backgroundColor: '#172554', color: 'white', borderRadius: '5px', padding: '5px', textAlign: 'center', minWidth: '80px' }}>
                ${mealPrices[meal].toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      
      <h2 style={{ textAlign: 'left', color: 'green', marginTop: '30px', fontSize: '0.7rem' }}>* Precio por Persona</h2>
    </div>
  );
};

export default FoodSelection;
