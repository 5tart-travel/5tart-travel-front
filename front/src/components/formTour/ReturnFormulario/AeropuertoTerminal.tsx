interface ITourFormProps {
  salida: string;
  setSalida: React.Dispatch<React.SetStateAction<string>>;
}

const AeropuertoTerminal: React.FC<ITourFormProps> = ({
  salida,
  setSalida,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="salida"
        className="block text-sm font-medium text-gray-700"
      >
        Nombre del aeropuerto o terminal
      </label>
      <input
        id="salida"
        type="text"
        value={salida}
        onChange={(e) => setSalida(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default AeropuertoTerminal;
