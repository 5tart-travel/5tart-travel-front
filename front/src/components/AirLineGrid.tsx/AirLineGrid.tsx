import Link from 'next/link';
import AirlineCard from '@/components/ui/AirLineCard';

const airlines = [
  { name: "Turkish Airlines", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858459/znk2rq7daukvpp8jjosq.svg", href: "https://www.turkishairlines.com" },
  { name: "LATAM Airlines", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858459/wqwg15ew6je1pwo2z2mf.svg", href: "https://www.latam.com" },
  { name: "Jetsmart", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858458/djhkdp1aldtxwwm2pfpz.svg", href: "https://www.jetsmart.com" },
  { name: "Iberia", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/pq4gycng2lhiapqbvz8o.svg", href: "https://www.iberia.com" },
  { name: "avianca", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/kquea1razkz5nxryseoq.svg", href: "https://www.avianca.com" },
  { name: "Flybondi", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/r6kuaput2bcppyq5klfh.svg", href: "https://www.flybondi.com" },
  { name: "Aerolineas Argentinas", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/qpbgfi8sjtn2ckfku6co.svg", href: "https://www.aerolineas.com.ar" },
  { name: "American Airlines", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719858457/dxa3nbtu62j39iku0jle.svg", href: "https://www.aa.com" },
  { name: "Air Canada", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719859255/uz3y7zanbwsh9dqmzhmy.svg", href: "https://www.aircanada.com" },
];

const AirlineGrid = () => {
  const firstRow = airlines.slice(0, 5);
  const secondRow = airlines.slice(5);

  return (
    <section  >
      <div className="p-6 ">
      <h2 className=" flex justify-center text-3xl text-gray-600 font-bold mb-4 text-shadow-semilight ">Top Aerolineas</h2>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {firstRow.map((airline, index) => (
          <Link href={airline.href} key={index}>
            <AirlineCard name={airline.name} logoSrc={airline.logoSrc} />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {secondRow.map((airline, index) => (
          <Link href={airline.href} key={index}>
            <AirlineCard name={airline.name} logoSrc={airline.logoSrc} />
          </Link>
        ))}
      </div>
    </div>
    </section>
    
  );
};

export default AirlineGrid;
