import Link from 'next/link';
import BusCard from '../ui/BusCard';

const buses = [
  { name: "Andesmar", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862034/c6b2ekwbkp397y68iaea.svg", href: "#" },
  { name: "Flecha Bus", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862035/a9iedzedpltbm9bu8mmx.png", href: "#" },
  { name: "Chevallier", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862035/p1rhtbe1q4twz1jbxerd.png", href: "#" },
  { name: "Via Bariloche", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862035/vhixlcjlxkaod1rplj6m.png", href: "#" },
  { name: "El Rapido Argentino", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862035/sfy3zrcdgig2bihdf99r.png", href: "#" },
  { name: "Plusmar", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862034/cuux0jsi8d5mvriegdkw.png", href: "#" },
  { name: "Crucero del Norte", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862034/swsqv50qfg0uoooi0mx0.png", href: "#" },
  { name: "La Nueva Empresa", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862034/sp5gzuij3pkgrhmpjtev.png", href: "#" },
  { name: "El Rosarino", logoSrc: "https://res.cloudinary.com/dia2gautk/image/upload/v1719862034/llxctyt2xiu5thir4lhc.png", href: "#" },
];

interface BusGridProps {
  tema: boolean;
}

const BusGrid: React.FC<BusGridProps> = ({tema}) => {
  const firstRow = buses.slice(0, 5);
  const secondRow = buses.slice(5);

  return (
    <section>
      <div className="p-6">
      <h2 className={`flex justify-center text-3xl ${ tema ? 'text-white' : 'text-gray-600' } font-bold mb-4 text-shadow-semilight`}>Top Buses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
          {firstRow.map((bus, index) => (
              <BusCard key={index} logoSrc={bus.logoSrc} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {secondRow.map((bus, index) => (
              <BusCard key={index} logoSrc={bus.logoSrc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusGrid;
