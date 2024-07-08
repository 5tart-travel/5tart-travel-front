import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Location from './location/page';
import Offer from './offer/page';
import Price from './price/page';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

export default function Filtros() {
  const [locationOpen, setLocationOpen] = useState(true);
  const [offerOpen, setOfferOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const toggleLocation = () => setLocationOpen(!locationOpen);
  const toggleOffer = () => setOfferOpen(!offerOpen);
  const togglePrice = () => setPriceOpen(!priceOpen);

  return (
    <main className="ml-6 mt-4 mr-6">
      <div className="flex items-center text-xl">
        <TbAdjustmentsHorizontal className="mr-2" />
        <h1 className="text-xl">Filtros</h1>
      </div>

      <Offer />

      <Price />

      <div
        className="flex items-center justify-between text-sm cursor-pointer mt-6"
        onClick={toggleLocation}
      >
        <h1 className="text-sm font-bold">Ubicación</h1>
        {locationOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {locationOpen && <Location />}
    </main>
  );
}
