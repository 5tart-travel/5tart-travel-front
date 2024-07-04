import React from 'react';
import AgenciaGeolocation from '@/components/Maps/TourGeolocation';
import { IBusTour } from '@/interface/IBusTour';

interface MapSectionProps {
  busDetails: IBusTour;
}

const MapSection: React.FC<MapSectionProps> = ({ busDetails }) => {
  if (!busDetails.agency) {
    return null; // No renderizar nada si no hay detalles de agencia
  }

  return (
    <section className="text-base flex items-center mt-5">
      <div className="relative w-full sm:w-3/4 lg:w-3/4 mx-auto rounded-lg overflow-hidden" style={{ height: '300px', width: '95%' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AgenciaGeolocation
            lat={busDetails.lat}
            lon={busDetails.lon}
            displayName={busDetails.display_name}
            touristPoints={busDetails.touristPoints}
          />
        </div>
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-red-600 p-3" style={{ zIndex: 10, textAlign: 'left' }}>
          <p>Ubicación del hotel</p>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
