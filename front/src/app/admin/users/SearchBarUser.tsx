'use client';

import React, { useState, ChangeEvent, Suspense } from 'react';
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
    onSearch(newQuery);

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
      placeholder="Buscar..."
      className="p-2 m-4 rounded-2xl border-none shadow-neutral-700 shadow-inner w-[600px]"
    />
  );
};

const WrappedSearchBarComponent: React.FC<SearchBarProps> = (props) => (
  <Suspense fallback={<div>Cargando...</div>}>
    <div className="flex justify-center">
      <div className="mb-4 w-[400px] flex items-center justify-center bg-neutral-700 rounded-xl shadow-lg">
        <SearchBarComponent {...props} />
      </div>
    </div>
  </Suspense>
);

export default WrappedSearchBarComponent;
