
import React, { useState, useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

interface Agencia {
  display_name: string;
  lat: number;
  lon: number;
}

interface AgenciaGeolocationProps {
  id: string;
}

const AgenciaGeolocation: React.FC<AgenciaGeolocationProps> = ({ id }) => {
  const [agencia, setAgencia] = useState<Agencia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const fetchAgencia = async () => {
      try {
        const response = await fetch(`https://huellasdesperanza.onrender.com/shelters/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server response was not in JSON format');
        }

        const data = await response.json();
        setAgencia(data.agencia);
        setError(null);
      } catch (error: any) {
        setError(error.message);
        setAgencia(null);
      }
    };

    fetchAgencia();
  }, [id]);

  useEffect(() => {
    if (typeof window !== 'undefined' && agencia && mapRef.current) {
      const L = require('leaflet');
      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([agencia.lat, agencia.lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance.current);
        L.marker([agencia.lat, agencia.lon]).addTo(mapInstance.current)
          .bindPopup('Shelter Location').openPopup();
      } else {
        mapInstance.current.setView([agencia.lat, agencia.lon], 13);
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [agencia]);

  return (
    <div>
      <div id="response" className='mt-10'>
        {error && <p>Error: {error}</p>}
        {agencia && (
          <>

            {/* <p>{shelter.display_name}</p> */}

          </>
        )}
      </div>
      <div id="map" ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
    </div>
  );
};

export default AgenciaGeolocation;

