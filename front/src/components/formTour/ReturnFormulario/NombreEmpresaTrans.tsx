interface ITourFormProps {
  empresa: string;
  setEmpresa: React.Dispatch<React.SetStateAction<string>>;
}

const NombreEmpresaTrans: React.FC<ITourFormProps> = ({
  empresa,
  setEmpresa,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="empresa"
        className="block text-sm font-medium text-gray-700"
      >
        Nombre de la empresa de transporte
      </label>
      <input
        id="empresa"
        type="text"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default NombreEmpresaTrans;
