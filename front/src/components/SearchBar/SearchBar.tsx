import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query) {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setResults(data.results);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="mt-5 w-full flex flex-col items-center">
        {results.length > 0
          ? results.map((result, index) => (
              <p
                key={index}
                className="border-b border-gray-200 p-2 w-full text-center"
              >
                {result}
              </p>
            ))
          : query && (
              <p>
                No se encontraron resultados para: <strong>{query}</strong>
              </p>
            )}
      </div>
    </div>
  );
};

export default SearchBar;
