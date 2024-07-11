import React from 'react';
import { IBusTour } from '@/interface/IBusTour';

interface SelectedPackageDetailsProps {
  selectedPackage: IBusTour | null;
}

const SelectedPackageDetails: React.FC<SelectedPackageDetailsProps> = ({ selectedPackage }) => {
  if (!selectedPackage) {
    return null;
  }

  const startDate = new Date(selectedPackage.fecha_ingreso);
  const endDate = new Date(selectedPackage.fecha_egreso);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.error(`Fechas inválidas para el tour con ID ${selectedPackage.id}`);
    return null;
  }

  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const tourDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));

  let noches = 0;
  if (selectedPackage.transportType === 'bus') {
    noches = tourDuration - 2;
  } else if (selectedPackage.transportType === 'plane') {
    noches = tourDuration - 1;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3>Paquete Seleccionado: {selectedPackage.title}</h3>
      <p>Precio: ${selectedPackage.price.toLocaleString()}</p>
      <p>Duración: {tourDuration} días, {noches} noches</p>
    </div>
  );
};

export default SelectedPackageDetails;
