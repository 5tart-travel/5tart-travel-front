'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IBusTour } from '@/interface/IBusTour';
import FoodSelection from './section/foodselection';
import RegionFilter from './section/filterregion';
import TouristPointsSection from './section/turispointsection';
import PackageList from './section/packagelist';

interface TouristPoint {
  name: string;
  price: number;
}

const Calculadora: React.FC = () => {
  const [tours, setTours] = useState<IBusTour[]>([]);
  const [filteredTours, setFilteredTours] = useState<IBusTour[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<IBusTour | null>(null);
  const [touristPoints, setTouristPoints] = useState<TouristPoint[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [totalFoodBudget, setTotalFoodBudget] = useState<number>(0);
  const [selectedTouristPoints, setSelectedTouristPoints] = useState<TouristPoint[]>([]);
  const [totalGeneral, setTotalGeneral] = useState<number>(0);


  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tours`);
        setTours(response.data);
        setFilteredTours(response.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const fetchTouristPoints = async () => {
      if (selectedPackage) {
        try {
          const points = selectedPackage.touristPoints.map(point => ({
            name: point.name,
            price: point.price,
          }));
          setTouristPoints(points);
        } catch (error) {
          console.error('Error fetching tourist points:', error);
        }
      } else {
        setTouristPoints([]);
      }
    };

    fetchTouristPoints();
  }, [selectedPackage]);

  const handleSelectRegion = (region: string | null) => {
    setSelectedRegion(region);
    if (region === null) {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter(tour => tour.region === region);
      setFilteredTours(filtered);
    }
  };

  const handleSelectPackage = (tour: IBusTour) => {
    setSelectedPackage(tour === selectedPackage ? null : tour);
  };

  const handleSelectMeal = (meal: string, price: number) => {
    setSelectedMeals(prevMeals => {
      const isSelected = prevMeals.includes(meal);
      const newSelectedMeals = isSelected ? prevMeals.filter(m => m !== meal) : [...prevMeals, meal];
      const newTotalBudget = isSelected ? totalBudget - price : totalBudget + price;
      setTotalBudget(newTotalBudget);
      return newSelectedMeals;
    });
  };

  useEffect(() => {
    if (selectedPackage) {
      const startDate = new Date(selectedPackage.fecha_ingreso);
      const endDate = new Date(selectedPackage.fecha_egreso);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const tourDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let noches = 0;

        if (selectedPackage.transportType === 'bus') {
          noches = tourDuration - 2;
        } else if (selectedPackage.transportType === 'plane') {
          noches = tourDuration - 1;
        }

        let totalFoodBudget = totalBudget * noches;
        setTotalFoodBudget(totalFoodBudget);
      }
    }
  }, [totalBudget, selectedPackage]);

  const calculateSelectedTouristPointsTotal = () => {
    let total = 0;
    selectedTouristPoints.forEach(point => {
      total += point.price;
    });
    return total;
  };

  const regions = [
    'Patagonia',
    'Noroeste',
    'Cuyo',
    'Pampeana',
    'Litoral',
    'Internacional',
  ];

  let selectedPackageDetails = null;
  if (selectedPackage) {
    const startDate = new Date(selectedPackage.fecha_ingreso);
    const endDate = new Date(selectedPackage.fecha_egreso);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error(`Fechas inválidas para el tour con ID ${selectedPackage.id}`);
    } else {
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const tourDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));

      let noches = 0;
      if (selectedPackage.transportType === 'bus') {
        noches = tourDuration - 2;
      } else if (selectedPackage.transportType === 'plane') {
        noches = tourDuration - 1;
      }

      selectedPackageDetails = (
        <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Paquete Seleccionado: </h3>
          <p>{selectedPackage.title}</p>
          <p>Duración: {tourDuration} días, {noches} noches</p>
          <p>Precio: ${selectedPackage.price.toLocaleString()}</p>
        </div>
      );
    }
  }
  useEffect(() => {
    const calculateTotalGeneral = () => {
      let total = totalFoodBudget;

      selectedTouristPoints.forEach(point => {
        total += point.price;
      });

      if (selectedPackage) {
        total += selectedPackage.price;
      }

      setTotalGeneral(total);
    };

    calculateTotalGeneral();
  }, [totalFoodBudget, selectedTouristPoints, selectedPackage]);


  return (
    <div>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Card principal */}
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>Calculadora de Gastos</h2>
          <p style={{ textAlign: 'center' }}>
            Ingrese lo que desea realizar durante el viaje, el paquete que desea comprar y las comidas por día para realizar un estimado del gasto total del viaje.
          </p>
        </div>

        {/* División vertical entre las dos secciones */}
        <div style={{ display: 'flex', gap: '20px', textAlign: 'center' }}>
          {/* Primera tarjeta: Detalles del Paquete y Tours Seleccionados */}
          <div style={{ backgroundColor: '#f0f0f0', padding: '20px', flex: '1 1 auto', marginBottom: '20px' }}>
            {/* Detalles del Paquete Turístico */}
            {selectedPackageDetails}

            {/* Tours Seleccionados */}
            {selectedTouristPoints.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Tours Seleccionados</h3>
                {selectedTouristPoints.map((point, index) => (
                  <div key={index}>
                    <p>{point.name}: ${point.price.toLocaleString()}</p>

                  </div>
                ))}
                <p style={{ marginTop: '10px', textAlign: 'center' }}>Total de Tours: ${calculateSelectedTouristPointsTotal().toLocaleString()}</p>

              </div>
            )}
            <p style={{ marginTop: '30px', textAlign: 'left', fontSize: '0.8em', color: 'green' }}>*Se reconmienda no colocar mas de 2 tours x</p>

          </div>

          {/* Segunda tarjeta: Totales */}
          <div style={{ backgroundColor: '#f0f0f0', padding: '20px', flex: '1 1 auto', marginBottom: '20px' }}>
            <h3 style={{ textAlign: 'center' }}>Presupuesto Total</h3>
            {selectedPackage && (
              <p style={{ marginTop: '10px', textAlign: 'center' }}>Total de Paquete Seleccionado: ${selectedPackage.price.toLocaleString()}</p>
            )}
            <p style={{ marginTop: '10px', textAlign: 'center' }}>Total de Comida por Día: ${totalBudget.toLocaleString()}</p>
            <p style={{ marginTop: '10px', textAlign: 'center' }}>Total de Comida: ${totalFoodBudget.toLocaleString()}</p>

            <p style={{ marginTop: '10px', textAlign: 'center' }}>Total de Tours: ${calculateSelectedTouristPointsTotal().toLocaleString()}</p>

            <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Total</h3>
            <p style={{ textAlign: 'center', fontSize: '1.5em' }}>${totalGeneral.toLocaleString()}</p>
            <p style={{ marginTop: '30px', textAlign: 'left', fontSize: '0.8em', color: 'green' }}>* El presupuesto de la comida se saca por la cantidad de noches del paquete</p>

          </div>
        </div>
      </section>






      <div style={{ display: 'flex', gap: '20px' }}>
        <FoodSelection selectedMeals={selectedMeals} handleSelectMeal={handleSelectMeal} />
        <RegionFilter
          selectedRegion={selectedRegion}
          regions={regions}
          handleSelectRegion={handleSelectRegion}
        />
      </div>

      <section>
        <hr className='mt-10' />
        <div>
          <h2 style={{ marginBottom: '20px', marginTop: '20px', textAlign: 'center' }}>Paquetes Disponibles</h2>
          <PackageList
            tours={tours}
            filteredTours={filteredTours}
            selectedPackage={selectedPackage}
            handleSelectPackage={handleSelectPackage}
          />
        </div>
      </section>

      <TouristPointsSection
        touristPoints={touristPoints}
        selectedPoints={selectedTouristPoints}
        setSelectedPoints={setSelectedTouristPoints}
      />
    </div>
  );
};

export default Calculadora;
