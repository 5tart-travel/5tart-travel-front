interface ITourFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const Titulo: React.FC<ITourFormProps> = ({ title, setTitle }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Título del tour
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default Titulo;
