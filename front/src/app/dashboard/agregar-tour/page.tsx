'use client';
import { ICreateTourDto } from '@/interface/ICreateTourDto';
import React, { useEffect, useState } from 'react';

interface FormularioTourProps {
  onClose: () => void;
  onAddTour: (tour: ICreateTourDto) => void;
}

const FormularioTour: React.FC<FormularioTourProps> = ({
  onClose,
  onAddTour,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [fecha_ingreso, setFecha_ingreso] = useState<Date | null>(null);
  const [fecha_egreso, setFecha_egreso] = useState<Date | null>(null);
  const [destino, setDestino] = useState('');
  const [salida, setSalida] = useState('');
  const [transportType, setTransportType] = useState<string | ''>('');
  const [imgUrl, setImgUrl] = useState('');
  const [hotel, setHotel] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [oferta, setOferta] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userSessionString: any = localStorage.getItem('userSession');
    console.log(userSessionString);

    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const ntoken = userSession.token;
      setToken(ntoken);
      console.log('Token obtenido en useEffect:', ntoken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && price !== null && description && address && transportType) {
      try {
        const nuevoTour: ICreateTourDto = {
          title,
          price,
          description,
          address,
          fecha_ingreso,
          fecha_egreso,
          destino,
          salida,
          transportType,
          hotel,
          empresa,
          // imgUrl,
          oferta,
        };

        console.log('Datos del nuevo tour:', JSON.stringify(nuevoTour));

        const tourResponse = await fetch(
          'https://fivetart-travel-kafg.onrender.com/tours',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(nuevoTour),
          },
        );

        if (!tourResponse.ok) {
          const responseText = await tourResponse.text();
          console.error('Respuesta del servidor:', responseText);
          throw new Error('Error al agregar el tour.');
        }

        alert('Tour agregado correctamente');
      } catch (error) {
        console.error('Error:', error);
        alert(
          'Ocurrió un error al agregar el tour. Por favor, intente nuevamente.',
        );
      }
    } else {
      alert('Por favor complete todos los campos obligatorios.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Tour</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                onChange={(e) =>
                  setPrice(e.target.value ? parseFloat(e.target.value) : null)
                }
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
                onChange={(e) =>
                  setFecha_ingreso(e.target.value ? new Date(e.target.value) : null)
                }
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
                onChange={(e) =>
                  setFecha_egreso(e.target.value ? new Date(e.target.value) : null)
                }
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
                onChange={(e) => setTransportType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Seleccione una opción</option>
                <option value="plane">Aéreo</option>
                <option value="bus">Terrestre</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">
                Hotel
              </label>
              <input
                id="hotel"
                type="text"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                Empresa
              </label>
              <input
                id="empresa"
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
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
                rows={4}
                style={{ resize: 'none' }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="oferta" className="block text-sm font-medium text-gray-700">
                Oferta
              </label>
              <input
                id="oferta"
                type="checkbox"
                checked={oferta || false}
                onChange={(e) => setOferta(e.target.checked ? true : false)}
                className="mt-1 block h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioTour;
