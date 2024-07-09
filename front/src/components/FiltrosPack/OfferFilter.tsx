interface OfferToggleProps {
  showOffersOnly: boolean;
  onToggleOffers: () => void;
}

const OfferFilter: React.FC<OfferToggleProps> = ({
  showOffersOnly,
  onToggleOffers,
}) => {
  return (
    <section className="max-w-6xl w-full bg-white rounded-md ">
      <label className="mt-5 mb-5 flex justify-between items-center cursor-pointer py-4 px-4">
        <h2>Ofertas</h2>

        <input
          type="checkbox"
          checked={showOffersOnly}
          onChange={onToggleOffers}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </section>
  );
};

export default OfferFilter;
