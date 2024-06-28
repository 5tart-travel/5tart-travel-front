// import Image from 'next/image';
// import React from 'react';

// interface CardProps {
//   src: string;
//   alt: string;
//   title: string;
//   description: string;
// }

// const Card: React.FC<CardProps> = ({ src, alt, title, description }) => {
//   return (
//     <div className="flex flex-col sm:flex-row w-full sm:w-[400px] h-auto sm:h-[150px] bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="w-full sm:w-[200px] h-[200px] sm:h-full">
//         <Image
//           src={src}
//           alt={alt}
//           className="object-cover w-full h-full"
//           width={200}
//           height={150}
//           layout="responsive"
//         />
//       </div>
//       <div className="p-4 flex flex-col justify-center">
//         <h3 className="text-lg font-bold">{title}</h3>
//         <p className="text-sm">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;

import Image from 'next/image';
import React from 'react';

interface CardProps {
  src: string;
  alt: string;
  title: string;
  price: number;
  agency: string;
}

const Card: React.FC<CardProps> = ({ src, alt, title, price, agency }) => {
  return (
    <div className="flex w-full sm:w-[400px] h-auto sm:h-[150px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-[40%]">
        <Image
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          width={200}
          height={150}
          layout="responsive"
        />
      </div>
      <div className="w-[60%] p-4 flex flex-col justify-center">
        <p className="text-xs text-gray-500 uppercase">Ida y Vuelta</p>
        <h3 className="text-xl font-bold text-blue-600">{title}</h3>
        <p className="text-sm mt-2">Desde</p>
        <p className="text-lg font-semibold text-gray-900">${price.toLocaleString()}</p>
        <p className="text-sm text-gray-500">Agencia: {agency}</p>
      </div>
    </div>
  );
};

export default Card;

