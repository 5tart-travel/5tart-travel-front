'use client';

import React, { useState, Suspense, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBarComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => { 
    const newQuery = event.target.value;
    setQuery(newQuery);

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
      placeholder="Buscar agencias..."
      className="p-2 m-4 rounded-2xl border-none shadow-black/30 shadow-inner w-[600px] "
    />
  );
};

const SearchBar: React.FC = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <SearchBarComponent />
  </Suspense>
);

export default SearchBar;
