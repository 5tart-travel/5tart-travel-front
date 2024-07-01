import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import axios from 'axios';
import { ISearch } from '@/interface/ISearch';

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
    try {
      const response = await axios.get(
        'https://huellasdesperanza.onrender.com/search',
        {
          params: { q: searchTerm },
        },
      );
      console.log('Response data:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error realizando la búsqueda:', error);
      setError('Error realizando la búsqueda');
    } finally {
      setLoading(false);
    }
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
      </div>
    </div>
  );
};

export default Search;
