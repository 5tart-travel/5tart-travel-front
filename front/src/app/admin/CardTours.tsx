'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaSuitcaseRolling } from 'react-icons/fa';

interface Tour {
  id: string;
  title: string;
  description: string;
  
}

const CardTours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  const fetchTours = async () => {
    try {
      const userSession = localStorage.getItem('userSession');
      const token = userSession ? JSON.parse(userSession).token : '';

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tours`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <Link href="/admin/packages">
      <div className="relative p-4 bg-white hover:bg-slate-50 rounded-2xl shadow-xl cursor-pointer text-white w-60 h-[150px] hover:shadow-2xl transition-shadow">
        <div className="absolute top-2 left-2 bg-white rounded-full p-2">
          <FaSuitcaseRolling className="text-lime-700" size={36} />
        </div>
        <div className="absolute bottom-2 right-2">
          <FaSuitcaseRolling className="text-yellow-500" size={36} />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-5xl text-gray-600 text-shadow-medium font-bold">{tours.length}</p>
          <p className="text-xl text-gray-600 text-shadow-medium font-semibold">Tours</p>
        </div>
      </div>
    </Link>
  );
};

export default CardTours;
