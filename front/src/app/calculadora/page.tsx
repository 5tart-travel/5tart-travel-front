'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IBusTour } from '@/interface/IBusTour';
import FoodSelection from './section/foodselection';
import RegionFilter from './section/filterregion';
import TouristPointsSection from './section/turispointsection';
import PackageList from './section/packagelist';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { IoRemoveCircleOutline, IoAddCircleOutline, IoFastFood } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FaMoneyCheckDollar, FaPeopleGroup } from "react-icons/fa6";
import { FaMapMarkedAlt } from 'react-icons/fa';
import { PiBackpackFill } from 'react-icons/pi';
import { MdAttachMoney } from 'react-icons/md';

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
  const [selectedTouristPoints, setSelectedTouristPoints] = useState<
    TouristPoint[]
  >([]);
  const [totalGeneral, setTotalGeneral] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tours`,
        );
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
          const points = selectedPackage.touristPoints.map((point) => ({
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
      const filtered = tours.filter((tour) => tour.region === region);
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
    setSelectedMeals((prevMeals) => {
      const isSelected = prevMeals.includes(meal);
      const newSelectedMeals = isSelected
        ? prevMeals.filter((m) => m !== meal)
        : [...prevMeals, meal];
      const newTotalBudget = isSelected
        ? totalBudget - price
        : totalBudget + price;
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
    selectedTouristPoints.forEach((point) => {
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
      console.error(
        `Fechas inválidas para el tour con ID ${selectedPackage.id}`,
      );
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
            border: '1px solid #f81010',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            backgroundColor:
              selectedPackage && selectedPackage.id === selectedPackage.id
                ? '#e0f7fa'
                : 'white',
            backgroundImage: `url(${selectedPackage.imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
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
                <p style={{ textAlign: 'left', margin: '5px 0' }}>
                  {tourDuration} días, {noches} noches
                </p>
              </h3>

              <div
                style={{
                  marginTop: '5px',
                  padding: '2px',
                  border: '1px solid #172554',
                  borderRadius: '5px',
                  backgroundColor: '#172554',
                  color: 'white',
                  margin: '0 auto',
                  width: 'fit-content',
                }}
              >
                <p>Precio: ${selectedPackage.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  const handlePeopleChange = (event: { target: any }) => {
    setNumberOfPeople(Number(event.target.value));
  };

  const handleIncrement = () => {
    setNumberOfPeople((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setNumberOfPeople((prev) => Math.max(prev - 1, 1));
  };
  useEffect(() => {
    const calculateTotalGeneral = () => {
      let total = totalFoodBudget;

      selectedTouristPoints.forEach((point) => {
        total += point.price;
      });

      if (selectedPackage) {
        total += selectedPackage.price;
      }
      total *= numberOfPeople;

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
    setNumberOfPeople(0);
  };
  const handleBuyClick = () => {
    if (!selectedPackage) {
      Swal.fire({
        title: 'Debe seleccionar un paquete para comprar',
        icon: 'warning',
      });
    } else {
      router.push(
        `/travel/pack_${selectedPackage.transportType}/${selectedPackage.id}`,
      );
    }
  };
  return (
    <div className="mt-2.5  ">
      <section className="flex flex-col gap-5 w-[95%] mx-auto  ">
        <div className="bg-violet-200 p-5 mb-5 w-full rounded-xl shadow-2xl">
          <h2 className="text-center text-gray-800 uppercase text-2xl font-bold text-shadow-medium mb-4">
            Planificador de Gastos de Viaje
          </h2>
          <p className="text-center text-gray-600 text-base text-shadow-semilight font-semibold leading-relaxed">
            Seleccione los campos a continuación para estimar el costo total de
            su viaje, incluyendo actividades, paquetes y alimentación diaria.
          </p>
        </div>

        <div className="flex gap-5 w-full">
          <div className="flex-1 flex flex-col gap-5 w-1/2">
            {/* Area  Paquete Seleccionado */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-2xl">
              {selectedPackageDetails ? (
                <div className="mb-5">
                  <h3 className="text-center text-gray-500 text-base text-shadow-semilight font-semibold leading-relaxed">
                    Paquete Seleccionado
                  </h3>
                  <p>{selectedPackageDetails}</p>
                </div>
              ) : (
                <div className="mb-5 rounded-lg">
                  <p className="text-center text-gray-500 text-base text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
                    <PiBackpackFill className="text-indigo-600 w-10 h-10 " />
                    No hay paquete seleccionado
                  </p>
                </div>
              )}
            </div>

            {/* Area Actividades Seleccionadas */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-2xl max-h-[57vh] min-h-[57vh] overflow-hidden flex flex-col">
              <h3 className="text-center text-gray-500 text-lg text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
                <FaMapMarkedAlt className="text-orange-400 w-10 h-10 mb-3 " />{' '}
                Actividades Seleccionadas
              </h3>
              <div className="mb-5 overflow-y-auto flex-1">
                <div className="grid grid-cols-4 gap-2.5 mb-2.5">
                  {selectedTouristPoints.map((point, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-2.5 text-center shadow-2xl flex flex-col justify-between"
                    >
                      <p className="m-0 text-xs font-bold min-h-[40px]">
                        {point.name}
                      </p>
                      <div className="bg-lime500 text-white rounded-tr-xl rounded-bl-xl p-1.5">
                        <p className="m-0 text-xs">
                          ${point.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Area Total */}
              <p className="text-center mb-5 bg-blue-950  text-white rounded-2xl p-2.5">
                
                Total de Actividades: $
                {calculateSelectedTouristPointsTotal().toLocaleString()}
              </p>

              <p className="mt-2.5 text-left text-xs text-green-600 text-shadow-light ">
                * Se recomienda no seleccionar más de 2 actividades
              </p>
            </div>
          </div>

          {/* Area total de paquete seleccionado */}
          <div className="flex-1 flex flex-col gap-5 w-1/2">
            <div className="bg-gray-50 mb-5 p-5 rounded-xl shadow-2xl">
              <h4 className="text-center text-gray-500 text-lg text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
              <PiBackpackFill className="text-indigo-600 w-6 h-6 " />
                Paquete Seleccionado
              </h4>
              <div className="mt-7 text-center p-2.5 border border-blue-950 rounded-2xl bg-blue-950 text-white">
                $
                {selectedPackage ? selectedPackage.price.toLocaleString() : '0'}
              </div>
            </div>
            {/*  Comida por dia */}
            <div className="bg-gray-50 p-5 mb-5 rounded-xl shadow-2xl">
              <h4 className="text-center text-gray-500 text-lg text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
              <IoFastFood className="text-pink-600 w-6 h-6 mb-3 " />
                Comida por Día
              </h4>
              <div className="mt-7 text-center p-2.5 border border-blue-950 rounded-2xl bg-blue-950 text-white">
                ${totalBudget.toLocaleString()}
              </div>
            </div>
            {/* Comida total  */}
            <div className="bg-gray-50 p-5 mb-5 rounded-md shadow-md">
              <h4 className="text-center text-gray-500 text-lg text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
              <IoFastFood className="text-lime500 w-6 h-6 mb-3 " />
                Comida total del viaje
              </h4>
              <div className="mt-7 text-center p-2.5 border border-blue-950 rounded-2xl bg-blue-950 text-white">
                ${totalFoodBudget.toLocaleString()}
              </div>
              <p className="mt-7 text-left text-xs text-green-600 text-shadow-light ">
                * Calculado por la cantidad de noches del paquete seleccionado.
              </p>
            </div>
            {/* Total de Actividades */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-2xl">
              <h4 className="text-center text-gray-500 text-lg text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
              <FaMapMarkedAlt className="text-orange-400 w-6 h-6 mb-3 " />
                Total Actividades
              </h4>
              <div className="mt-7 text-center p-2.5 border border-blue-950 rounded-2xl bg-blue-950 text-white">
                ${calculateSelectedTouristPointsTotal().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          {/*  Cantidad de personas */}
          <div className="flex w-full h-[100px] overflow-hidden ">
            <div className="bg-violet-50 shadow-inner  p-2.5  w-1/2 flex flex-col items-center justify-center mr-2.5 rounded-xl  ">
            <label
  htmlFor="people-count"
  className=" mb-2 text-lg font-semibold text-center text-gray-600 text-shadow-medium flex items-center justify-center"
>
  <FaPeopleGroup className="mr-2 w-8 h-8 text-cyan-500 " />
  Cantidad de Personas
</label>
              <div className="flex items-center border border-gray-300  rounded-2xl overflow-hidden bg-gray-100 w-full  ">
                <button
                  onClick={() =>
                    handlePeopleChange({
                      target: { value: Math.max(numberOfPeople - 1, 1) },
                    })
                  }
                  className="bg-blue-950 hover:bg-blue-900 rounded-l-2xl border-none text-white text-base p-2.5 cursor-pointer transition-colors duration-300  flex-shrink-0"
                >
                  <IoRemoveCircleOutline size={30} />
                </button>

                <input
                  type="number"
                  id="people-count"
                  min="1"
                  value={numberOfPeople}
                  onChange={handlePeopleChange}
                  className="flex-1 text-center border-none outline-none text-base p-2.5 bg-gray-50 shadow-inner  "
                />

                <button
                  onClick={() =>
                    handlePeopleChange({
                      target: { value: numberOfPeople + 1 },
                    })
                  }
                  className="bg-blue-950 hover:bg-blue-900 border-none text-white text-base p-2.5 cursor-pointer transition-colors duration-300 rounded-r-2xl flex-shrink-0"
                >
                  <IoAddCircleOutline size={30} />
                </button>
              </div>
            </div>

            <div className="bg-violet-50 shadow-inner p-2.5  w-1/2 flex flex-col items-center rounded-xl ml-2.5">
              <h2 className="text-center text-gray-600 text-lg text-shadow-semilight font-semibold leading-relaxed flex items-center justify-center gap-2">
              <FaMoneyCheckDollar className="text-purple-500 text-xl w-8 h-8 " />
                Compra tu Paquete
              </h2>

              <div className="flex gap-2.5 justify-center w-full">
                <button
                  onClick={handleBuyClick}
                  className="bg-blue-950 hover:bg-blue-900 text-white border-none text-[16px] px-6 py-3 cursor-pointer transition-colors duration-300 rounded-2xl font-medium flex-1 text-center"
                >
                  Comprar
                </button>

                <button
                  onClick={handleClearAll}
                  className="bg-blue-950 hover:bg-blue-900 text-white  border-none text-[16px] cursor-pointer transition-colors duration-300 rounded-2xl font-medium flex-1 text-center"
                >
                  Limpiar Todos los Campos
                </button>
              </div>
            </div>
          </div>
          
        <div className="mt-2.5 bg-violet-200 p-9 text-center rounded-xl shadow-2xl">
          <h3 className="text-center text-gray-600 text-xl text-shadow-semilight font-bold leading-relaxed flex items-center justify-center gap-2">Total General</h3>
          <div className="mt-7.5 text-center text-3xl py-2.5 border border-blue-950 rounded-2xl bg-blue-950 text-white">
            ${totalGeneral.toLocaleString()}
          </div>
        </div>
        </div>
      </section>

      <div className="flex flex-row gap-5 p-2.5 flex-wrap justify-center">
  <FoodSelection
    selectedMeals={selectedMeals}
    handleSelectMeal={handleSelectMeal}
  />
  <RegionFilter
    selectedRegion={selectedRegion}
    regions={regions}
    handleSelectRegion={handleSelectRegion}
  />
</div>

      <hr className="mt-10" />

      <section className="flex justify-between w-full">

      <div className="flex-1 mr-5">
  <div>
    <h2 className="text-center text-gray-600 text-xl text-shadow-semilight font-bold leading-relaxed flex items-center justify-center gap-2">
      Paquetes Disponibles
    </h2>
            <PackageList
              tours={tours}
              filteredTours={filteredTours}
              selectedPackage={selectedPackage}
              handleSelectPackage={handleSelectPackage}
            />
          </div>
        </div>
        <div className="flex-1 ml-5">
  <div>
    <h2 className="mb-5 mt-5 text-center">
      Actividades Disponibles
    </h2>
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
