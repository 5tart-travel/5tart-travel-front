'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);  // Llama al callback para actualizar el estado en el componente padre

    const params = new URLSearchParams(searchParams as any);
    if (newQuery) {
      params.set('search', newQuery);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Buscar usuarios..."
      className="p-2 m-4 rounded-2xl border-none shadow-black/30 shadow-inner w-[600px] "
    />
  );
};

export default SearchBarComponent;
