interface ITourFormProps {
  destino: string;
  setDestino: React.Dispatch<React.SetStateAction<string>>;
}

const Provincia: React.FC<ITourFormProps> = ({ destino, setDestino }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="destino"
        className="block text-sm font-medium text-gray-700"
      >
        Provincia
      </label>
      <input
        id="destino"
        type="text"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default Provincia;
