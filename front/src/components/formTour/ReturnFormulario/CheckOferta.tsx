interface ITourFormProps {
  oferta: boolean;
  setOferta: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckOferta: React.FC<ITourFormProps> = ({ oferta, setOferta }) => {
  return (
    <div className="mb-4 mt-5 flex items-center">
      <input
        id="oferta"
        type="checkbox"
        checked={oferta || false}
        onChange={(e) => setOferta(e.target.checked)}
        className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label
        htmlFor="oferta"
        className="block text-sm font-medium text-gray-700"
      >
        Marque si es una oferta
      </label>
    </div>
  );
};

export default CheckOferta;
