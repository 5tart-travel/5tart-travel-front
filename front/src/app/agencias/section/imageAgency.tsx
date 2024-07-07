import React from 'react';
import Image from 'next/image';

interface PackageDetailsProps {
  imgUrl: string;
  name_agency: string;
  
}

const ImageAgency: React.FC<PackageDetailsProps> = ({ imgUrl, name_agency}) => {



  return (
    <section className="text-base text-center mb-4 flex justify-center z-1">
      <div className="relative w-full sm:w-3/4 lg:w-3/4 mx-auto mt-8 rounded-lg overflow-hidden" style={{ height: '500px', width: '95%' }}>
        <div className="relative h-full">
          <Image src={imgUrl} alt={name_agency} layout="fill" objectFit="cover" quality={100} className="rounded-lg" />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
            <div>
              <h1 className="text-white text-4xl mb-4 text-left">{name_agency}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};


export default ImageAgency;
