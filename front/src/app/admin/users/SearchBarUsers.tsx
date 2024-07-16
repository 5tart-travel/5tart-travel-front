'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBarComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const params = new URLSearchParams(searchParams);
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
      className=" p-2 my-4 rounded-2xl border-none  shadow-black/30 shadow-lg "
    />
  );
};

const SearchBar: React.FC = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <SearchBarComponent />
  </Suspense>
);

export default SearchBar;
