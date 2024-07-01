import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-stone-500">
          4<span className="animate-pulse">0</span>4
        </h1>
        <h2 className="text-2xl font-medium mt-4">Oops! Esta página no existe.</h2>
        <div className="mt-8 flex justify-between space-x-20">
          <Link href="/">
            <h2 className="text-4xl font-semibold text-orange-600 hover:text-orange-400 transition"> &larr; Go back</h2>
          </Link>
          <Link href="/">
            <h2 className="text-4xl font-semibold text-orange-600 hover:text-orange-400 transition">Go home &rarr;</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
