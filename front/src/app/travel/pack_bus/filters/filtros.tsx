import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Location from './location/page';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

const Filtros = () => {
  const [locationOpen, setLocationOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const toggleLocation = () => setLocationOpen(!locationOpen);

  return (
    <main className="ml-6 mt-4 mr-6">
      <div className="flex items-center text-xl">
        <TbAdjustmentsHorizontal className="mr-2" />
        <h1 className="text-xl">Filtros</h1>
      </div>

      <div
        className="flex items-center justify-between text-sm cursor-pointer mt-6"
        onClick={toggleLocation}
      >
        <h1 className="text-sm font-bold">Ubicación</h1>
        {locationOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {locationOpen && <Location setSelectedLocation={setSelectedLocation} />}
    </main>
  );
};

export default Filtros;
