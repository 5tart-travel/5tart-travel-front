// // pages/index.tsx
// import React, { useEffect, useState } from 'react';;
// import CardGrid from '@/components/Card_grid/CardGrid';

// interface Tour {
//   id: number;
//   title: string;
//   price: number;
//   location: string;
//   imgUrl: string;
//   oferta:boolean;
// }

// const CardInternacional: React.FC = () => {
//   const [tours, setTours] = useState<Tour[]>([]);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await fetch('https://fivetart-travel-kafg.onrender.com/tours');
//         const data = await response.json();
//         setTours(data);
//       } catch (error) {
//         console.error('Error fetching tours:', error);
//       }
//     };

//     fetchTours();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//       {tours.map(tour => (
//         <CardGrid
//           key={tour.id}
//           title={tour.title}
//           price={tour.price}
//           location={tour.location}
//           imageUrl={tour.imgUrl} 
//           oferta={tour.oferta}  
//         />
//       ))}
//     </div>
//   );
// };

// export default CardInternacional;
// pages/index.tsx
import React, { useEffect, useState } from 'react';
import CardGrid from '@/components/Card_grid/CardGrid';

interface Tour {
  id: number;
  title: string;
  price: number;
  location: string;
  imgUrl: string;
  oferta: boolean;
  region: string; 
  hotel: string;   
  state: string;
  country: string;
  empresa : string;
}

const CardInternacional: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://fivetart-travel-kafg.onrender.com/tours');
        const data: Tour[] = await response.json();
        const internationalTours = data.filter(tour => tour.region === 'Internacional');
        setTours(internationalTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {tours.map(tour => (
        <CardGrid
          key={tour.id}
          title={tour.title}
          price={tour.price}
          location={tour.location}
          imageUrl={tour.imgUrl} 
          oferta={tour.oferta} 
          region={tour.region}
          hotel={tour.hotel}
          state={tour.state}
          country={tour.country}
          empresa={tour.empresa} 
        />
      ))}
    </div>
  );
};

export default CardInternacional;