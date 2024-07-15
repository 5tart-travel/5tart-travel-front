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
    <div style={{ width: '50vw', maxHeight: '50vh', overflowY: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredTours.map((tour) => {
          const startDate = new Date(tour.fecha_ingreso);
          const endDate = new Date(tour.fecha_egreso);
  
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error(`Fechas inválidas para el tour con ID ${tour.id}`);
            return null;
          }
  
          const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
          const tourDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
          let noches = 0;
          if (tour.transportType === 'bus') {
            noches = tourDuration - 2;
          } else if (tour.transportType === 'plane') {
            noches = tourDuration - 1;
          }
  
          return (
            <div
              key={tour.id}
              style={{
                border: '1px solid #172554',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 4px 8px #172554',
                cursor: 'pointer',
                backgroundColor: selectedPackage && selectedPackage.id === tour.id ? '#172554' : 'white',
                backgroundImage: `url(${tour.imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => handleSelectPackage(tour)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      textAlign: 'center',
                      fontSize: '1rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '160px',
                      color: 'white',
                      backgroundColor: '#172554',
                      padding: '5px',
                      borderRadius: '5px'
                    }}
                  >
                    {tour.title}
                    <p style={{ textAlign: 'left' }}>{tourDuration} días, {noches} noches</p>
                  </h3>
  
                  <div style={{
                    marginTop: '5px',
                    textAlign: 'center',
                    padding: '2px',
                    border: '1px solid #172554',
                    borderRadius: '5px',
                    backgroundColor: '#172554',
                    color: 'white'
                  }}>
                    <p>Precio: ${tour.price.toLocaleString()}</p>
                  </div>
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
    </div>
  );
  
};

      export default PackageList;
