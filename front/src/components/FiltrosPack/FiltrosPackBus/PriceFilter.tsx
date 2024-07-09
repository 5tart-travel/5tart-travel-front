import React from 'react';

interface PriceSorterProps {
  sortByPrice: string;
  onSortByPrice: (order: string) => void;
}

const PriceFilter: React.FC<PriceSorterProps> = ({
  sortByPrice,
  onSortByPrice,
}) => {
  return (
    <section className="max-w-6xl w-full mb-8 px-4 py-4 bg-white rounded-md">
      <h2 className="mb-2">Más relevantes</h2>
      <div className="flex flex-col space-y-4 mt-5">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="priceOrder"
            value="asc"
            checked={sortByPrice === 'asc'}
            onChange={() => onSortByPrice('asc')}
            className="form-radio text-blue-600 h-4 w-4"
          />
          <span className={`hover:underline ${sortByPrice === 'asc' && 'font-bold'}`}>
            Menor precio
          </span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="priceOrder"
            value="desc"
            checked={sortByPrice === 'desc'}
            onChange={() => onSortByPrice('desc')}
            className="form-radio text-blue-600 h-4 w-4"
          />
          <span className={`hover:underline ${sortByPrice === 'desc' && 'font-bold'}`}>
            Mayor precio
          </span>
        </label>
      </div>
    </section>
  );
};

export default PriceFilter;


// interface PriceSorterProps {
//   sortByPrice: string;
//   onSortByPrice: (order: string) => void;
// }

// const PriceFilter: React.FC<PriceSorterProps> = ({
//   sortByPrice,
//   onSortByPrice,
// }) => {
//   return (
//     <section className="max-w-6xl w-full mb-8 px-4 py-4 bg-white rounded-md">
//   <h2 className="mb-2">Ordenar por:</h2>
//   <div className="flex flex-col space-y-4 mt-5">
//     <button
//       className={`hover:underline ${sortByPrice === 'asc' && 'font-bold ' }`}
//       onClick={() => onSortByPrice('asc')}
//     >
//       Menor a Mayor
//     </button>
//     <button
//       className={`hover:underline ${sortByPrice === 'desc' && 'font-bold'}`}
//       onClick={() => onSortByPrice('desc')}
//     >
//       Mayor a Menor
//     </button>
//   </div>
// </section>

//   );
// };

// export default PriceFilter;
