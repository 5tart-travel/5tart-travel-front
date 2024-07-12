interface ITourFormProps {
  fecha_ingreso: Date | null;
  setFecha_ingreso: React.Dispatch<React.SetStateAction<Date | null>>;
}

const FechaIngreso: React.FC<ITourFormProps> = ({
  fecha_ingreso,
  setFecha_ingreso,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="fecha_ingreso"
        className="block text-sm font-medium text-gray-700"
      >
        Fecha de Ingreso
      </label>
      <input
        id="fecha_ingreso"
        type="date"
        value={fecha_ingreso ? fecha_ingreso.toISOString().split('T')[0] : ''}
        onChange={(e) =>
          setFecha_ingreso(e.target.value ? new Date(e.target.value) : null)
        }
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default FechaIngreso;
