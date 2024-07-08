import React from 'react';
import ImageUpload from '../ui/ImageUpload';

interface TourFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  price: number | null;
  setPrice: React.Dispatch<React.SetStateAction<number | null>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  fecha_ingreso: Date | null;
  setFecha_ingreso: React.Dispatch<React.SetStateAction<Date | null>>;
  fecha_egreso: Date | null;
  setFecha_egreso: React.Dispatch<React.SetStateAction<Date | null>>;
  destino: string;
  setDestino: React.Dispatch<React.SetStateAction<string>>;
  salida: string;
  setSalida: React.Dispatch<React.SetStateAction<string>>;
  transportType: string;
  setTransportType: React.Dispatch<React.SetStateAction<string>>;
  hotel: string;
  setHotel: React.Dispatch<React.SetStateAction<string>>;
  empresa: string;
  setEmpresa: React.Dispatch<React.SetStateAction<string>>;
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  oferta: boolean;
  setOferta: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent) => void;
}

export const TourForm: React.FC<TourFormProps> = ({
  title,
  setTitle,
  price,
  setPrice,
  description,
  setDescription,
  address,
  setAddress,
  fecha_ingreso,
  setFecha_ingreso,
  fecha_egreso,
  setFecha_egreso,
  destino,
  setDestino,
  salida,
  setSalida,
  transportType,
  setTransportType,
  hotel,
  setHotel,
  empresa,
  setEmpresa,
  imgUrl,
  setImgUrl,
  oferta,
  setOferta,
  handleSubmit,
}) => {
  const handleUpload = (file: File, imageUrl: string) => {
    setImgUrl(imageUrl);
  };

  const maxDescriptionLength = 150;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Título del tour
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
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="fecha_ingreso"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="fecha_egreso"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="hotel"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Dirección del hotel
        </label>
        <input
          id="address"
          placeholder="Ej: Av. Corrientes 123, Ciudad Autónoma de Buenos Aires"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="transportType"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="empresa"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre de la empresa de transporte
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
        <label
          htmlFor="salida"
          className="block text-sm font-medium text-gray-700"
        >
          Ida
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
        <label
          htmlFor="destino"
          className="block text-sm font-medium text-gray-700"
        >
          Vuelta
        </label>
        <input
          id="destino"
          type="text"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 relative">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= maxDescriptionLength) {
              setDescription(e.target.value);
            }
          }}
          rows={4}
          style={{ resize: 'none' }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <div className="text-sm text-gray-500 absolute bottom-1 right-1">
          {description.length}/{maxDescriptionLength}
        </div>
      </div>

      <ImageUpload onUpload={handleUpload} />

      <div className="mb-4 mt-5 flex items-center">
        <input
          id="oferta"
          type="checkbox"
          checked={oferta || false}
          onChange={(e) => setOferta(e.target.checked)}
          className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label
          htmlFor="oferta"
          className="block text-sm font-medium text-gray-700"
        >
          Marque si es una oferta
        </label>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-xl text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};
