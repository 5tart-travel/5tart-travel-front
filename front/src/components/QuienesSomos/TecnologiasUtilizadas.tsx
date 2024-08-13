'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const techImages = [
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978824/docker-svgrepo-com_nkgelp.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720978909/nestjs-svgrepo-com_mila6v.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720980190/typeorm-seeklogo_yrhlog.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/nextjs-fill-svgrepo-com_gex3sf.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979364/postgresql-svgrepo-com_rshfwh.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979053/react-svgrepo-com_zr1hmj.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979363/tailwind-svgrepo-com_uc0ova.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/typescript-svgrepo-com_r27oof.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979359/cloudinary-svgrepo-com_bmgtxs.svg',
  'https://res.cloudinary.com/dd1yaduhv/image/upload/v1720979357/vercel-svgrepo-com_ikaimt.svg',
];

const TecnologiasUtilizadas: React.FC = () => {
  return (
    <div className="Slider_div__2ugI6 relative w-full overflow-hidden mt-10">
      <div className="Slider_container__TdW1j w-full overflow-hidden">
        <div className=" flex animate-slide-loop">
          {techImages.concat(techImages).map((src, index) => (
            <div key={index} className="  flex-shrink-0 p-2">
              <Image src={src} alt="Tecnología" width={150} height={150} />
            </div>
          ))}
        </div>
      </div>
      <div className=" absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TecnologiasUtilizadas;
