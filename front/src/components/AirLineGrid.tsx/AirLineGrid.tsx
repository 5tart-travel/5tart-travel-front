import Link from 'next/link';
import AirlineCard from '@/components/ui/AirLineCard';

const airlines = [
  { name: "Turkish Airlines", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858459/znk2rq7daukvpp8jjosq.svg", href: "#" },
  { name: "LATAM Airlines", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858459/wqwg15ew6je1pwo2z2mf.svg", href: "#" },
  { name: "Jetsmart", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858458/djhkdp1aldtxwwm2pfpz.svg", href: "#" },
  { name: "Iberia", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/pq4gycng2lhiapqbvz8o.svg", href: "#" },
  { name: "avianca", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/kquea1razkz5nxryseoq.svg", href: "#" },
  { name: "Flybondi", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/r6kuaput2bcppyq5klfh.svg", href: "#" },
  { name: "Aerolineas Argentinas", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/qpbgfi8sjtn2ckfku6co.svg", href: "#" },
  { name: "American Airlines", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/dxa3nbtu62j39iku0jle.svg", href: "#" },
  { name: "Air Canada", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719859255/uz3y7zanbwsh9dqmzhmy.svg", href: "#" },
];

interface AirlineGridProps {
  tema: boolean;
}

const AirlineGrid: React.FC<AirlineGridProps> = ({ tema }) => {
  const firstRow = airlines.slice(0, 5);
  const secondRow = airlines.slice(5);

  return (
    <section>
      <div className="p-6">
        <h2 className={`flex justify-center text-3xl ${ tema ? 'text-white' : 'text-gray-600' } font-bold mb-4 text-shadow-semilight`}>Top Aerolíneas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
          {firstRow.map((airline, index) => (
              <AirlineCard key={index} name={airline.name} logoSrc={airline.logoSrc} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {secondRow.map((airline, index) => (
              <AirlineCard key={index} name={airline.name} logoSrc={airline.logoSrc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AirlineGrid;
