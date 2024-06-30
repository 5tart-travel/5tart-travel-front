import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon, Map as LeafletMap } from "leaflet";
import L from "leaflet";

const DefaultIcon = new Icon({
  iconRetinaUrl: "/marker-icon-2x-1.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

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
  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
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