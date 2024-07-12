interface ITourFormProps {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const NacionalInter: React.FC<ITourFormProps> = ({ region, setRegion }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="region"
        className="block text-sm font-medium text-gray-700"
      >
        Nacional/Internacional
      </label>
      <select
        id="region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Seleccione una opción</option>
        <option value="Argentina">Nacional</option>
        <option value="Internacional">Internacional</option>
      </select>
    </div>
  );
};

export default NacionalInter;
