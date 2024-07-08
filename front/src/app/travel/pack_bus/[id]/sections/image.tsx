import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface PackageDetailsProps {
  imgUrl: string;
  title: string;
  description: string;
  averageRate: number;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({
  imgUrl,
  title,
  description,
  averageRate,
}) => {
  const [rating, setRating] = useState<number>(averageRate);

  useEffect(() => {
    console.log('averageRate changed:', averageRate);
    setRating(averageRate);
  }, [averageRate]);
  
  
  function renderStars() {
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return null;
    }

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starIcon = (
        <FaRegStar className="text-yellow-500 text-2xl" />
      ); 

      if (i <= rating) {
        starIcon = <FaStar className="text-yellow-500 text-2xl" />; 
      }

      stars.push(
        <span key={i}>
          {starIcon}
        </span>
      );
    }

    return <div className="flex space-x-1 mb-2">{stars}</div>;
  }

  return (
    <section className="text-base text-center mb-4 flex justify-center">
      <div
        className="relative w-full sm:w-3/4 lg:w-3/4 mx-auto mt-8 rounded-lg overflow-hidden"
        style={{ height: '500px', width: '95%' }}
      >
        <div className="relative h-full">
          <Image
            src={imgUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-white text-4xl mr-2">{title}</h1>
                <div className="mt-4 ml-2">{renderStars()}</div>
              </div>
              <p className="text-white text-lg text-left">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
