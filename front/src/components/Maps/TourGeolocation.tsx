import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface AgenciaGeolocationProps {
  lat: number;
  lon: number;
  displayName: string;
}

const AgenciaGeolocation: React.FC<AgenciaGeolocationProps> = ({
  lat,
  lon,
  displayName,
}) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      map.setView([lat, lon], map.getZoom());
    }
  }, [lat, lon]);

  const position: LatLngExpression = [lat, lon];

  return (
    <div>
      <MapContainer
        className="rounded-lg"
        center={position}
        zoom={13}
        style={{ height: "200px", width: "100%", marginTop: "20px" }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>{displayName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default AgenciaGeolocation;
