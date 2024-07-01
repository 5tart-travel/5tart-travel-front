import Image from 'next/image';
import { FC } from 'react';

interface BusCardProps {
  name?: string;
  logoSrc: string;
}

const BusCard: FC<BusCardProps> = ({ name, logoSrc }) => {
  return (
    <div className="flex items-center justify-center w-full h-20 p-4 bg-white rounded-lg shadow-2xl cursor-pointer hover:shadow-lg transition-shadow">
      <Image src={logoSrc} alt={`${name} logo`} width={120} height={100} className="mr-2"/>
      <span className="text-sm font-semibold">{name}</span>
    </div>
  );
};

export default BusCard;
