'use client';
import React, { useState } from 'react';

interface CreateTourDto {
  title: string;
  price: number | null;
  description: string;
  imgUrl?: string;
  address: string;
  fecha_ingreso?: Date | null;
  fecha_egreso?: Date | null;
  destino?: string;
  salida?: string;
  oferta?: boolean;
  transportType: string | '';
}

interface FormularioTourProps {
  onClose: () => void;
  onAddTour: (tour: CreateTourDto) => void;
}

const FormularioTour: React.FC<FormularioTourProps> = ({ onClose, onAddTour }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [fecha_ingreso, setFecha_ingreso] = useState<Date | null>(null);
  const [fecha_egreso, setFecha_egreso] = useState<Date | null>(null);
  const [destino, setDestino] = useState('');
  const [salida, setSalida] = useState('');
  const [transportType, setTransportType] = useState<string | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userSessionString = localStorage.getItem('userSession');
    if (!userSessionString) {
      alert('No hay una sesión de usuario activa.');
      return;
    }
    const userSession = JSON.parse(userSessionString);
    const token = userSession.access_token;

    if (title && price !== null && description && address && transportType) {
      try {
        const nuevoTour: CreateTourDto = {
          title,
          price,
          description,
          address,
          fecha_ingreso: fecha_ingreso || undefined,
          fecha_egreso: fecha_egreso || undefined,
          destino: destino || undefined,
          salida: salida || undefined,
          transportType,
        };

        const tourResponse = await fetch('https://fivetart-travel.onrender.com/tours', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(nuevoTour),
        });

        if (!tourResponse.ok) {
          throw new Error('Error al agregar el tour.');
        }

        onAddTour(nuevoTour);
        alert('Tour agregado correctamente');
        onClose();
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al agregar el tour. Por favor, intente nuevamente.');
      }
    } else {
      alert('Por favor complete todos los campos obligatorios.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Tour</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              id="price"
              type="number"
              value={price !== null ? price : ''}
              onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4} // Definir un número fijo de filas
              style={{ resize: 'none' }} // Evitar la redimensionabilidad
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fecha_ingreso" className="block text-sm font-medium text-gray-700">
              Fecha de Ingreso
            </label>
            <input
              id="fecha_ingreso"
              type="date"
              value={fecha_ingreso ? fecha_ingreso.toISOString().split('T')[0] : ''}
              onChange={(e) => setFecha_ingreso(e.target.value ? new Date(e.target.value) : null)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fecha_egreso" className="block text-sm font-medium text-gray-700">
              Fecha de Egreso
            </label>
            <input
              id="fecha_egreso"
              type="date"
              value={fecha_egreso ? fecha_egreso.toISOString().split('T')[0] : ''}
              onChange={(e) => setFecha_egreso(e.target.value ? new Date(e.target.value) : null)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
              Destino
            </label>
            <input
              id="destino"
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salida" className="block text-sm font-medium text-gray-700">
              Salida
            </label>
            <input
              id="salida"
              type="text"
              value={salida}
              onChange={(e) => setSalida(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="transportType" className="block text-sm font-medium text-gray-700">
              Tipo de Transporte
            </label>
            <select
              id="transportType"
              value={transportType}
              onChange={(e) => setTransportType(e.target.value as string)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione una opción</option>
              <option value="bus">Bus</option>
              <option value="plane">Avión</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioTour;
