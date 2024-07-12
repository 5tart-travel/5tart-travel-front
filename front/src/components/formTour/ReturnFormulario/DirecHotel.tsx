interface ITourFormProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const DirecHotel: React.FC<ITourFormProps> = ({ address, setAddress }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="address"
        className="block text-sm font-medium text-gray-700"
      >
        Dirección del hotel
      </label>
      <input
        id="address"
        placeholder="Ej: Av. Corrientes 123, Ciudad Autónoma de Buenos Aires"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default DirecHotel;
