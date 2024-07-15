interface ITourFormProps {
  fecha_egreso: Date | null;
  setFecha_egreso: React.Dispatch<React.SetStateAction<Date | null>>;
}

const FechaEgreso: React.FC<ITourFormProps> = ({
  fecha_egreso,
  setFecha_egreso,
}) => {
  return (
    <div className="mb-4 mr-9">
      <label
        htmlFor="fecha_egreso"
        className="block text-sm font-medium text-gray-700"
      >
        Fecha de Egreso
      </label>
      <input
        id="fecha_egreso"
        type="date"
        value={fecha_egreso ? fecha_egreso.toISOString().split('T')[0] : ''}
        onChange={(e) =>
          setFecha_egreso(e.target.value ? new Date(e.target.value) : null)
        }
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default FechaEgreso;
