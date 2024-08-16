'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAccessTime } from "react-icons/md";
import { FaCloudSun, FaMoon, FaCloudRain, FaBolt, FaSnowflake, FaSmog } from 'react-icons/fa';

const ClockWeather: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');
  const [worldTime, setWorldTime] = useState<Record<string, string>>({});
  const [weather, setWeather] = useState<string>('');
  const [isDay, setIsDay] = useState<boolean>(true);
  const [weatherIcon, setWeatherIcon] = useState<React.ReactNode>(null);

  useEffect(() => {
    // Obtener la hora local de Argentina
    const updateLocalTime = () => {
      const time = new Date().toLocaleTimeString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
      setLocalTime(time);
    };

    // Actualizar la hora cada segundo
    const localTimeInterval = setInterval(updateLocalTime, 1000);
    updateLocalTime();

    // Obtener la hora mundial de diferentes lugares (puedes añadir más ciudades)
    const updateWorldTime = () => {
      const cities: Record<string, string> = {
        'Londres': 'Europe/London',
        'Tokio': 'Asia/Tokyo',
      };

      const updatedTimes: Record<string, string> = {};

      for (const city in cities) {
        if (cities.hasOwnProperty(city)) {
          updatedTimes[city] = new Date().toLocaleTimeString('es-AR', { timeZone: cities[city] });
        }
      }

      setWorldTime(updatedTimes);
    };

    // Actualizar la hora mundial cada segundo
    const worldTimeInterval = setInterval(updateWorldTime, 1000);
    updateWorldTime();

    // Obtener la información del clima de Mendoza, Argentina
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Usa la clave API de .env
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Mendoza,AR&units=metric&lang=es&appid=${apiKey}`);
        
        const temp = response.data.main.temp.toFixed(1); // Formatear la temperatura a 1 decimal
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const sunrise = response.data.sys.sunrise * 1000; // Convertir a milisegundos
        const sunset = response.data.sys.sunset * 1000; // Convertir a milisegundos
        const now = new Date().getTime();
        
        setWeather(`${temp}°C - ${description}`);

        // Determinar si es de día o noche
        if (now >= sunrise && now <= sunset) {
          setIsDay(true);
        } else {
          setIsDay(false);
        }

        // Mapear el icono del clima a los íconos de React
        const weatherIcons: Record<string, React.ReactNode> = {
          "01d": <FaCloudSun className="text-yellow-500" size={48} />, // Soleado de día
          "01n": <FaMoon className="text-yellow-600" size={48} />, // Despejado de noche
          "02d": <FaCloudSun className="text-yellow-500" size={48} />, // Parcialmente nublado de día
          "02n": <FaMoon className="text-yellow-600" size={48} />, // Parcialmente nublado de noche
          "03d": <FaCloudSun className="text-yellow-500" size={48} />, // Nublado de día
          "03n": <FaMoon className="text-yellow-600" size={48} />, // Nublado de noche
          "04d": <FaCloudSun className="text-gray-500" size={48} />, // Muy nublado de día
          "04n": <FaMoon className="text-gray-600" size={48} />, // Muy nublado de noche
          "09d": <FaCloudRain className="text-blue-500" size={48} />, // Lluvia ligera
          "09n": <FaCloudRain className="text-blue-600" size={48} />, // Lluvia ligera de noche
          "10d": <FaCloudRain className="text-blue-500" size={48} />, // Lluvia
          "10n": <FaCloudRain className="text-blue-600" size={48} />, // Lluvia de noche
          "11d": <FaBolt className="text-yellow-500" size={48} />, // Tormenta
          "11n": <FaBolt className="text-yellow-600" size={48} />, // Tormenta de noche
          "13d": <FaSnowflake className="text-blue-500" size={48} />, // Nieve
          "13n": <FaSnowflake className="text-blue-600" size={48} />, // Nieve de noche
          "50d": <FaSmog className="text-gray-500" size={48} />, // Neblina
          "50n": <FaSmog className="text-gray-600" size={48} />, // Neblina de noche
        };

        setWeatherIcon(weatherIcons[icon] || null);
      } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        setWeather('No disponible');
        setWeatherIcon(null);
      }
    };

    fetchWeather();

    // Limpiar los intervalos al desmontar el componente
    return () => {
      clearInterval(localTimeInterval);
      clearInterval(worldTimeInterval);
    };
  }, []);

  return (
    <div className="relative p-4 bg-neutral-600 rounded-2xl shadow-lg text-white w-60 h-[300px] flex flex-col justify-between items-center">
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">{localTime}</p>
        <p className="text-lg font-light mt-2">Hora Local (Argentina)</p>
      </div>

      <div className="flex flex-col items-center">
        {weatherIcon}
        <p className="text-3xl font-bold mt-2">{weather}</p>
      </div>

      <div className="w-full flex justify-between mt-4">
        {Object.entries(worldTime).map(([city, time]) => (
          <div key={city} className="text-sm font-light">
            <span className="block text-center">{city}</span>
            <span className="block text-center">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClockWeather;
