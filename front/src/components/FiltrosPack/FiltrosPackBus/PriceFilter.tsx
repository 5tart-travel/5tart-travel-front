interface PriceSorterProps {
  sortByPrice: string;
  onSortByPrice: (order: string) => void;
}

const PriceFilter: React.FC<PriceSorterProps> = ({
  sortByPrice,
  onSortByPrice,
}) => {
  return (
    <section className="max-w-6xl w-full mb-8">
      <h2 className="text-xl font-bold mb-2">Ordenar por Precio:</h2>
      <div className="flex space-x-4">
        <button
          className={`hover:underline ${sortByPrice === 'asc' && 'font-bold'}`}
          onClick={() => onSortByPrice('asc')}
        >
          Menor a Mayor
        </button>
        <button
          className={`hover:underline ${sortByPrice === 'desc' && 'font-bold'}`}
          onClick={() => onSortByPrice('desc')}
        >
          Mayor a Menor
        </button>
      </div>
    </section>
  );
};

export default PriceFilter;
