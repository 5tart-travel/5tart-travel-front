import { useState, useEffect } from 'react';
import { IBusTour } from '@/interface/IBusTour';
import StateFilter from './StateFilter';
import OfferFilter from './OfferFilter';
import PriceFilter from './PriceFilter';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

interface FilterComponentProps {
  buses: IBusTour[];
  setFilteredTours: (tours: IBusTour[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  buses,
  setFilteredTours,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Todas');
  const [mostrarSoloOffer, setmostrarSoloOffer] = useState<boolean>(false);
  const [ordenarPrecio, setOrdenarPrecio] = useState<string>('');
  const [estadosDisponibles, setEstadosDisponibles] = useState<string[]>([]);
  // const [stateFilterOpen, setStateFilterOpen] = useState<boolean>(true); 

  useEffect(() => {
    const states = buses.map((tour) => tour.state);
    const estadosUnicos = Array.from(new Set(states));
    setEstadosDisponibles(estadosUnicos);
  }, [buses]);

  const filterTours = (
    region: string,
    offersOnly: boolean,
    priceOrder: string,
  ) => {
    let filtered = buses.filter((tour) => {
      if (region === 'Todas') {
        return offersOnly ? tour.oferta === true : true;
      } else {
        return offersOnly
          ? tour.state === region && tour.oferta === true
          : tour.state === region;
      }
    });

    if (priceOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (priceOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredTours(filtered);
  };

  const handleFiltroRegion = (region: string) => {
    setSelectedRegion(region);
    filterTours(region, mostrarSoloOffer, ordenarPrecio);
  };

  const handlleSwitchOfertas = () => {
    const newShowOffersOnly = !mostrarSoloOffer;
    setmostrarSoloOffer(newShowOffersOnly);
    filterTours(selectedRegion, newShowOffersOnly, ordenarPrecio);
  };

  const ordenarPorPrecio = (order: string) => {
    setOrdenarPrecio(order);
    filterTours(selectedRegion, mostrarSoloOffer, order);
  };

  const resetFilters = () => {
    setSelectedRegion('Todas');
    setmostrarSoloOffer(false);
    setOrdenarPrecio('');
    setFilteredTours(buses);
  };

  // const toggleStateFilter = () => {
  //   setStateFilterOpen(!stateFilterOpen);
  // };

  return (
    <div>
      <div className="flex items-center text-xl">
        <TbAdjustmentsHorizontal className="mr-2" />
        <h1 className="text-xl font-semibold">Filtros</h1>
      </div>

      <OfferFilter
        showOffersOnly={mostrarSoloOffer}
        onToggleOffers={handlleSwitchOfertas}
      />
      <PriceFilter
        sortByPrice={ordenarPrecio}
        onSortByPrice={ordenarPorPrecio}
      />
      
      <div className="relative">
        <div
          className="flex items-center cursor-pointer justify-between mt-8"
          // onClick={toggleStateFilter}
        >
          <div className="mr-2 ">Ubicación:</div>
          <div className="transform transition-transform duration-300 ">
            {/* {stateFilterOpen ? (
              
              <svg
                className="fill-current text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 6l6 6H4l6-6z"
                  clipRule="evenodd"
                />
              </svg>
            ):(<svg
            className="fill-current text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path
              fillRule="evenodd"
              d="M10 14l-6-6h12l-6 6z"
              clipRule="evenodd"
            />
          </svg>
        )} */}
          </div>
        </div>
        {/* {stateFilterOpen && ( */}
          <StateFilter
            selectedRegion={selectedRegion}
            availableStates={estadosDisponibles}
            onFilterRegion={handleFiltroRegion}
            buses={buses}
          />
        {/* )} */}
      </div>
      
      <button onClick={resetFilters} className="hover:underline mt-4">
        Limpiar Filtros
      </button>
    </div>
  );
};

export default FilterComponent;
