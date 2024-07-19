'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IBusTour } from '@/interface/IBusTour';
import FoodSelection from './section/foodselection';
import RegionFilter from './section/filterregion';
import TouristPointsSection from './section/turispointsection';
import PackageList from './section/packagelist';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1); 
  const router = useRouter();




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
  useEffect(() => {

    setSelectedTouristPoints([]);
    setTotalFoodBudget(0);
  }, [selectedPackage]);

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
    'Patagonica',
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
        <div
          key={selectedPackage.id}
          style={{
            border: '1px solid #1e3a8a',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            backgroundColor: selectedPackage && selectedPackage.id === selectedPackage.id ? '#e0f7fa' : 'white',
            backgroundImage: `url(${selectedPackage.imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}

        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center', maxWidth: '160px' }}>
              <h3
                style={{
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '5px',
                  borderRadius: '5px',
                  margin: '0 auto',
                }}
              >
                {selectedPackage.title}
                <p style={{ textAlign: 'left', margin: '5px 0' }}>{tourDuration} días, {noches} noches</p>
              </h3>

              <div style={{
                marginTop: '5px',
                padding: '2px',
                border: '1px solid #172554',
                borderRadius: '5px',
                backgroundColor: '#172554',
                color: 'white',
                margin: '0 auto',
                width: 'fit-content'
              }}>
                <p>Precio: ${selectedPackage.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

      );
    }
  }

  const handlePeopleChange = (event: { target: any; }) => {
    setNumberOfPeople(Number(event.target.value));
  };

  const handleIncrement = () => {
    setNumberOfPeople(prev => prev + 1);
  };

  const handleDecrement = () => {
    setNumberOfPeople(prev => Math.max(prev - 1, 1));
  };
  useEffect(() => {
    const calculateTotalGeneral = () => {
      let total = totalFoodBudget;

      selectedTouristPoints.forEach(point => {
        total += point.price;
      });

      if (selectedPackage) {
        total += selectedPackage.price;
      }
      total *= numberOfPeople

      setTotalGeneral(total);
    };

    calculateTotalGeneral();
  }, [totalFoodBudget, selectedTouristPoints, selectedPackage, numberOfPeople]);
  const handleClearAll = () => {
    setSelectedPackage(null);
    setTouristPoints([]);
    setSelectedRegion(null);
    setSelectedMeals([]);
    setTotalBudget(0);
    setTotalFoodBudget(0);
    setSelectedTouristPoints([]);
    setTotalGeneral(0);
    setNumberOfPeople(0)
  };
  const handleBuyClick = () => {
    if (!selectedPackage) {
      Swal.fire({
        title: 'Debe seleccionar un paquete para comprar',
        icon: 'warning',
      });
    } else {
      router.push(`/travel/pack_${selectedPackage.transportType}/${selectedPackage.id}`);
    }
  };
  return (
    <div style={{ marginTop: '10px' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '95%', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#172554', padding: '20px', marginBottom: '20px', width: '100%', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: '24px', marginBottom: '15px' }}>Planificador de Gastos de Viaje</h2>
          <p style={{ textAlign: 'center', color: 'white', fontSize: '16px', lineHeight: '1.6' }}>
            Seleccione los campos a continuación para estimar el costo total de su viaje, incluyendo actividades, paquetes y alimentación diaria.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px', width: '50%' }}>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              {selectedPackageDetails ? (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ textAlign: 'center' }}>Paquete Seleccionado</h3>
                  <p>{selectedPackageDetails}</p>
                </div>
              ) : (
                <div style={{ marginBottom: '20px', borderRadius: '10px' }}>
                  <p style={{ textAlign: 'center' }}>No hay paquete seleccionado</p>
                  <p style={{ textAlign: 'center' }}>Total: $0</p>
                </div>
              )}
            </div>

            <div style={{
              backgroundColor: '#f0f0f0',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              maxHeight: '57vh',
              minHeight: '57vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Actividades Seleccionadas</h3>

              <div style={{
                marginBottom: '20px',
                overflowY: 'auto',
                flex: '1'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                  marginBottom: '10px'
                }}>
                  {selectedTouristPoints.map((point, index) => (
                    <div key={index} style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '5px',
                      padding: '10px',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px #172554',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <p style={{
                        margin: '0',
                        fontSize: '0.8em',
                        fontWeight: 'bold',
                        minHeight: '40px'
                      }}>{point.name}</p>
                      <div style={{
                        backgroundColor: '#172554',
                        color: 'white',
                        borderRadius: '5px',
                        padding: '5px'
                      }}>
                        <p style={{ margin: '0', fontSize: '0.8em' }}>${point.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{
                textAlign: 'center',
                marginBottom: '20px',
                backgroundColor: '#172554',
                color: 'white',
                borderRadius: '5px',
                padding: '10px'
              }}>
                Total de Actividades: ${calculateSelectedTouristPointsTotal().toLocaleString()}
              </p>

              <p style={{ marginTop: '10px', textAlign: 'left', fontSize: '0.8em', color: 'green' }}>
                * Se recomienda no seleccionar más de 2 actividades
              </p>
            </div>

          </div>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px', width: '50%' }}>
            <div style={{ backgroundColor: '#f0f0f0', marginBottom: '23px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h4 style={{ textAlign: 'center' }}>Paquete Seleccionado</h4>
              <div style={{
                marginTop: '30px',
                textAlign: 'center',
                padding: '5px 10px',
                border: '1px solid #172554',
                borderRadius: '5px',
                backgroundColor: '#172554',
                color: 'white'
              }}>
                ${selectedPackage ? selectedPackage.price.toLocaleString() : '0'}
              </div>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', marginBottom: '23px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h4 style={{ textAlign: 'center' }}>Comida por Día</h4>
              <div style={{
                marginTop: '30px',
                textAlign: 'center',
                padding: '5px 10px',
                border: '1px solid #172554',
                borderRadius: '5px',
                backgroundColor: '#172554',
                color: 'white'
              }}>
                ${totalBudget.toLocaleString()}
              </div>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', marginBottom: '23px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h4 style={{ textAlign: 'center' }}>Comida total del viaje</h4>
              <div style={{
                marginTop: '30px',
                textAlign: 'center',
                padding: '5px 10px',
                border: '1px solid #172554',
                borderRadius: '5px',
                backgroundColor: '#172554',
                color: 'white'
              }}>
                ${totalFoodBudget.toLocaleString()}
              </div>
              <p style={{ marginTop: '30px', textAlign: 'left', fontSize: '0.8em', color: 'green' }}>* Calculado por la cantidad de noches del paquete seleccionado.</p>

            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h4 style={{ textAlign: 'center' }}>Total Actividades</h4>
              <div style={{
                marginTop: '30px',
                textAlign: 'center',
                padding: '5px 10px',
                border: '1px solid #172554',
                borderRadius: '5px',
                backgroundColor: '#172554',
                color: 'white'
              }}>
                ${calculateSelectedTouristPointsTotal().toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          width: '100%',
          height: '100px',
          overflow: 'hidden',
        }}>
          <div style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
            borderRadius: '10px'
          }}>
            <label htmlFor="people-count" style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '18px',
              textAlign: 'center',
              color: '#333',
              fontWeight: '500'
            }}>
              Cantidad de Personas
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#f9f9f9',
              width: '100%',
              maxWidth: '100%'
            }}>
              <button
                onClick={() => handlePeopleChange({ target: { value: Math.max(numberOfPeople - 1, 1) } })}
                style={{
                  backgroundColor: '#1e3a8a',
                  border: 'none',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '11px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  borderRadius: '8px 0 0 8px',
                  flex: '0 0 auto',
                }}
              >
                <IoRemoveCircleOutline size={20} />
              </button>
              <input
                type="number"
                id="people-count"
                min="1"
                value={numberOfPeople}
                onChange={handlePeopleChange}
                style={{
                  flex: '1',
                  textAlign: 'center',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  padding: '10px',
                  borderRadius: '0',
                  backgroundColor: '#ffffff',
                }}
              />
              <button
                onClick={() => handlePeopleChange({ target: { value: numberOfPeople + 1 } })}
                style={{
                  backgroundColor: '#1e3a8a',
                  border: 'none',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '11px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  borderRadius: '0 8px 8px 0',
                  flex: '0 0 auto',
                }}
              >
                <IoAddCircleOutline size={20} />
              </button>
            </div>
          </div>

          <div style={{
  backgroundColor: '#f0f0f0',
  padding: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  marginLeft: '10px'
}}>
  <h2 style={{
    marginBottom: '16px',
    fontSize: '20px',
    textAlign: 'center',
    color: '#333',
    fontWeight: '600'
  }}>
    Compra tu Paquete
  </h2>
  <div style={{
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    width: '100%'
  }}>
      <button
              onClick={handleBuyClick}
              style={{
        backgroundColor: '#172554',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        padding: '12px 24px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        borderRadius: '10px',
        fontWeight: '500',
        flex: '1',
        textAlign: 'center'
      }}>
        Comprar
      </button>

    <button
      onClick={handleClearAll}
      style={{
        backgroundColor: '#172554',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        borderRadius: '10px',
        fontWeight: '500',
        flex: '1',
        textAlign: 'center'
      }}
    >
      Limpiar Todos los Campos
    </button>
  </div>
</div>


        </div>

        <div style={{ marginTop: '10px', backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ textAlign: 'center' }}>Total General</h3>
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            padding: '5px 10px',
            border: '1px solid #172554',
            borderRadius: '5px',
            backgroundColor: '#172554',
            color: 'white'
          }}>
            ${totalGeneral.toLocaleString()}
          </div>
        </div>
      </section>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <FoodSelection selectedMeals={selectedMeals} handleSelectMeal={handleSelectMeal} />
        <RegionFilter
          selectedRegion={selectedRegion}
          regions={regions}
          handleSelectRegion={handleSelectRegion}
        />
      </div>
      <hr className='mt-10' />




      <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <div>
            <h2 style={{ marginBottom: '20px', marginTop: '20px', textAlign: 'center' }}>Paquetes Disponibles</h2>
            <PackageList
              tours={tours}
              filteredTours={filteredTours}
              selectedPackage={selectedPackage}
              handleSelectPackage={handleSelectPackage}
            />
          </div>
        </div>
        <div style={{ flex: '1', marginLeft: '20px' }}>
          <div>
            <h2 style={{ marginBottom: '20px', marginTop: '20px', textAlign: 'center' }}>Actividades Disponibles</h2>

            <TouristPointsSection
              touristPoints={touristPoints}
              selectedPoints={selectedTouristPoints}
              setSelectedPoints={setSelectedTouristPoints}
            />
          </div>
        </div>
      </section>
      <div className="flex justify-center mb-16">
        <Link href={'/travel/pack_bus'}>
          <BackButton />
        </Link>
      </div>


    </div>
  );
};

export default Calculadora;
