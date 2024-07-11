'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ResumenFinanciero: React.FC = () => {
  const [totalIngresos, setTotalIngresos] = useState<number>(1872);
  const porcentajeGasto = 60; // Porcentaje del círculo en color azul
  const porcentajeReferencia = 40; // Porcentaje del círculo en color morado

  useEffect(() => {

    const calcularBruto = async () => {
      try {
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/order');

        const data: any = response.data;
        
        let total = 0
        
        for (let i = 0; i < data.length; i++) {
          total += data[i].price
        }
        
        setTotalIngresos(total);
      
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }
    
    calcularBruto()

  }, [])
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out hover:bg-slate-50 cursor-pointer text-center">
      <h3 className="text-lg text-gray-700 font-bold mb-4">Resumen Financiero</h3>
      <div className="w-48 mx-auto">
        <CircularProgressbarWithChildren
          value={porcentajeGasto}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8, // Rotación para hacer que sea un semicírculo
            strokeLinecap: 'round',
            pathColor: `#36A2EB`,
            trailColor: '#e0e0e0',
          })}
        >
          <CircularProgressbarWithChildren
            value={porcentajeReferencia}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 - 1 / 8,
              strokeLinecap: 'round',
              pathColor: `#6a1b9a`,
              trailColor: 'transparent',
            })}
          >
            <div className="text-center">
              <p className="text-2xl text-gray-800 font-bold">${totalIngresos}</p>
              <p className="text-sm text-gray-600">Ingresos</p>
            </div>
          </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
      </div>
      {/* <div className="flex justify-around mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#36A2EB] rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Spent</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#6a1b9a] rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Referral</span>
        </div>
      </div> */}
    </div>
  );
};

export default ResumenFinanciero;
