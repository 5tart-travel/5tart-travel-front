import React from 'react';
import { IBusTour } from '@/interface/IBusTour';

interface PackageListProps {
  tours: IBusTour[];
  filteredTours: IBusTour[];
  selectedPackage: IBusTour | null;
  handleSelectPackage: (tour: IBusTour) => void;
}

const PackageList: React.FC<PackageListProps> = ({ tours, filteredTours, selectedPackage, handleSelectPackage }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', overflowY: 'auto' }}>
      {filteredTours.map((tour: IBusTour) => {

        const startDate = new Date(tour.fecha_ingreso);
        const endDate = new Date(tour.fecha_egreso);


        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error(`Fechas inválidas para el tour con ID ${tour.id}`);
          return null;
        }

        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const tourDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));

        let noches = 0
        if (tour.transportType === 'bus') {  noches = tourDuration - 2 }
        else if (tour.transportType === 'plane') {  noches = tourDuration - 1 }

        return (
          <div
            key={tour.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              backgroundColor: selectedPackage && selectedPackage.id === tour.id ? '#e0f7fa' : 'white',
            }}
            onClick={() => handleSelectPackage(tour)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3>{tour.title}</h3>
                <p>Precio: ${tour.price.toLocaleString()}</p>
                <p>Duración: {tourDuration} días, {noches} noches</p>
              </div>
              <input
                type="checkbox"
                checked={selectedPackage ? selectedPackage.id === tour.id : false}
                readOnly
                style={{ marginLeft: '10px' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PackageList;
