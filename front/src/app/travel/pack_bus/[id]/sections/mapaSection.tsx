import React, { useRef, useState } from 'react';
import AgenciaGeolocation from '@/components/Maps/TourGeolocation';
import { IBusTour } from '@/interface/IBusTour';
import './map.css';

interface MapSectionProps {
  busDetails: IBusTour;
}

const MapSection: React.FC<MapSectionProps> = ({ busDetails }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  if (!busDetails.agency) {
    return null;
  }

 const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    if (mapContainerRef.current) {
      mapContainerRef.current.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
      setFullscreen(true); 
    }
  } else {
    document.exitFullscreen();
    setFullscreen(false); 
  }
};

  return (
    <section className="text-base flex items-center mt-5">
      <div
        ref={mapContainerRef}
        className={`relative w-full sm:w-3/4 lg:w-3/4 mx-auto rounded-lg overflow-hidden map-container ${fullscreen ? 'fullscreen' : ''}`}
        style={{ height: '300px', width: '95%' }}
      >
        <div className="map-content" style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }}>
          <AgenciaGeolocation
            lat={busDetails.lat}
            lon={busDetails.lon}
            displayName={busDetails.display_name}
            touristPoints={busDetails.touristPoints}
          />
        </div>
        <div className={`fullscreen-overlay ${fullscreen ? 'active' : ''}`} onClick={toggleFullscreen}>
          <button
            className={`fullscreen-button absolute bottom-0 right-0 bg-black bg-opacity-40 text-red-600 p-3 ${fullscreen ? 'exiting-fullscreen' : ''}`}
            style={{ zIndex: 20 }}
          >
            {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
