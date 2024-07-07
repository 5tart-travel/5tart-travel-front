'use client';
import React from 'react';
import { TourForm } from './TourForm';
import { useTourForm } from './useTourForm';

const FormularioTour: React.FC = () => {
  const {
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
    oferta,
    setOferta,
    handleSubmit,
  } = useTourForm();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md overflow-y-auto max-h-full">
        <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Tour</h2>
        <TourForm
          title={title}
          setTitle={setTitle}
          price={price}
          setPrice={setPrice}
          description={description}
          setDescription={setDescription}
          address={address}
          setAddress={setAddress}
          fecha_ingreso={fecha_ingreso}
          setFecha_ingreso={setFecha_ingreso}
          fecha_egreso={fecha_egreso}
          setFecha_egreso={setFecha_egreso}
          destino={destino}
          setDestino={setDestino}
          salida={salida}
          setSalida={setSalida}
          transportType={transportType}
          setTransportType={setTransportType}
          hotel={hotel}
          setHotel={setHotel}
          empresa={empresa}
          setEmpresa={setEmpresa}
          oferta={oferta}
          setOferta={setOferta}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default FormularioTour;
