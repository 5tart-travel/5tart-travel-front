import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { ISearch } from '@/interface/ISearch';

// Datos de ejemplo hardcodeados
const exampleResults: ISearch[] = [
  { id: 1, name: 'Resultado 1', description: 'Descripción del resultado 1' },
  { id: 2, name: 'Resultado 2', description: 'Descripción del resultado 2' },
  { id: 3, name: 'Resultado 3', description: 'Descripción del resultado 3' },
];

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ISearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    console.log('Searching for:', searchTerm);

    // Simular un retraso en la búsqueda
    setTimeout(() => {
      try {
        // Filtrar los resultados de ejemplo en base al término de búsqueda
        const filteredResults = exampleResults.filter((result) =>
          result.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        console.log('Filtered results:', filteredResults);
        setResults(filteredResults);
      } catch (error) {
        console.error('Error realizando la búsqueda:', error);
        setError('Error realizando la búsqueda');
      } finally {
        setLoading(false);
      }
    }, 1000); // Simula una búsqueda que tarda 1 segundo
  };

  return (
    <div className="hidden lg:flex flex-col items-center">
      <form onSubmit={handleSearch} className="flex w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar..."
          className="flex-grow px-2 text-gray-700 focus:outline-none rounded-l-2xl"
        />

        <button
          type="submit"
          className="flex items-center justify-center px-4 text-white bg-gray-700 rounded-r-2xl focus:outline-none"
        >
          <RiSearchLine className="w-5 h-5" />
        </button>
      </form>
      <div className="w-full">
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Cargando...</p>}
        <ul>
          {results.map((result) => (
            <li key={result.id} className="p-2 border-b border-gray-300">
              <h3 className="text-lg font-semibold">{result.name}</h3>
              <p className="text-gray-600">{result.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
