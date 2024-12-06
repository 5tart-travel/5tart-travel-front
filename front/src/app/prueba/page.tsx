"use client";

import axios from 'axios';
import socket from '@/hooks/useSocket';
import { useEffect, useState } from 'react';

export interface Agency {
  id: number;
  name_agency: string;
}

const HomePage = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    // Obtener los datos iniciales mediante una solicitud HTTP
    const fetchInitialData = async () => {
      try {
        const response = await axios.get<Agency[]>(`${process.env.NEXT_PUBLIC_API_URL}/agency/disable`);
        setAgencies(response.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();

    // Conectar al servidor WebSocket y configurar los eventos
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('getAllItems');
    });

    socket.on('allDisableAgency', (items: Agency[]) => {
      console.log('Received disabled agencies from server:', items);
      setAgencies(items);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Limpiar los eventos al desmontar el componente
    return () => {
      socket.off('connect');
      socket.off('allDisableAgency');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      <h1>Disabled Agencies</h1>
      <ul>
        {agencies.map((agency) => (
          <li key={agency.id}>{agency.name_agency}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
