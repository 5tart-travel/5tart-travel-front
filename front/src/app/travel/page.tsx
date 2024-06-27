'use client'
import withAuth from '@/HOC/withAuth';
import ModalFilterTravels from '@/components/Card-Travel/FiltroTravel/ModalFilterMascotas';
import ListaTravel from '@/components/Card-Travel/ListaTravel';
import { ITravels } from '@/interface/ITravels';
import useUserRole from '@/utils/userSession';
import { Suspense, lazy, useEffect, useState } from 'react';


const ListaTravels = lazy(() => import('@/components/Card-Travel/ListaTravel'));

const Travel = () => {
  const [travelsState, setTravelsState] = useState<ITravels[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ edad: string; tamaño: string; sexo: string; especie: string }>({ edad: '', tamaño: '', sexo: '', especie: ''});
  const [filterOptions, setFilterOptions] = useState<{ edades: number[]; tamaños: string[]; sexos: string[], especies: string[] }>({ edades: [], tamaños: [], sexos:[], especies:[] });
  const userRole = useUserRole(); 

  useEffect(() => {
    const savedFilters = localStorage.getItem('mascotasFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }

    const fetchTravels = async () => {
      try {
        const response = await fetch('https://huellasdesperanza.onrender.com/search/pets');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de las mascotas!');
        }
        const data: ITravels[] = await response.json();
        setTravelsState(data);
        const edades = Array.from(new Set(data.map(travel => travel.age || 0)));
        const tamaños = Array.from(new Set(data.map(travel => travel.pet_size || '')));
        const sexos = Array.from(new Set(data.map(travel => travel.sexo || '')));
        const especies = Array.from(new Set(data.map(travel => travel.species || '')));
        setFilterOptions({ edades, tamaños, sexos, especies });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTravels();
  }, []);

  const handleFilter = (edad: string, tamaño: string, sexo: string, especie: string) => {
    console.log('Aplicando filtros:', { edad, tamaño, sexo, especie });
    const filters = { edad, tamaño, sexo, especie };
    setFilters(filters);
    localStorage.setItem('travelsFilters', JSON.stringify(filters));
    setFilterModalVisible(false);
  };

  const filtrarTravels = () => {
    return travelsState.filter(travel => {
      const edadCoincide = filters.edad ? (
        (filters.edad === 'cachorro' && travel.month === 'meses') ||
        (filters.edad === 'adulto' && travel.age && travel.age >= 1 && travel.age <= 5 && travel.month === 'años') ||
        (filters.edad === 'senior' && travel.age && travel.age > 5 && travel.month === 'años')
      ) : true;
      const tamañoCoincide = filters.tamaño ? travel.pet_size === filters.tamaño : true;
      const sexoCoincide = filters.sexo ? travel.sexo === filters.sexo : true;
      const especieCoincide = filters.especie ? travel.species === filters.especie : true;
      return edadCoincide && tamañoCoincide && sexoCoincide && especieCoincide;
    });
  };

  const updateTravel = (updatedTravel: ITravels) => {
    setTravelsState(prevState =>
      prevState.map(travel =>
        travel.id === updatedTravel.id ? updatedTravel : travel
      )
    );
  };

  const deleteTravelFromList = (travelId: string) => {
    setTravelsState(prevState => prevState.filter(m => m.id !== travelId));
  };

  const filteredTravels = filtrarTravels();

  return (
    <main className="flex flex-col items-center bg-gray-50">
      <div className="flex justify-center space-x-2">
        <button onClick={() => setFilterModalVisible(true)} className="mt-3 text-white bg-lime500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2">
          Filtrar Travels
        </button>
      </div>
      <Suspense fallback={<div>Cargando travels...</div>}>
        {filteredTravels.length > 0 ? (
          <ListaTravel
            travel={filteredTravels} 
            updateTravel={updateTravel}
            deleteTravel={deleteTravelFromList}
          />
        ) : (
          <div>No se encontraron travels con los filtros seleccionados!</div>
        )}
      </Suspense>
      <ModalFilterTravels
        isOpen={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onFilter={handleFilter}
        edades={filterOptions.edades}
        tamaños={filterOptions.tamaños}
        sexos={filterOptions.sexos}
        especies={filterOptions.especies}
      />
    </main>
  );
};

export default withAuth(Travel);



