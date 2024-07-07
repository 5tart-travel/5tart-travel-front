import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon, Map as LeafletMap } from "leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";


const AgencyIcon = new Icon({
  iconUrl: "/iconorojo.png",
  iconRetinaUrl: "/red-marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [48, 42],
  iconAnchor: [15, 42],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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

interface TouristPoint {
  name: string;
  lat: number;
  lon: number;
}

interface AgenciaGeolocationProps {
  lat: number;
  lon: number;
  displayName: string;
  touristPoints: TouristPoint[];
}

const AgenciaGeolocation: React.FC<AgenciaGeolocationProps> = ({
  lat,
  lon,
  displayName,
  touristPoints,
}) => {
  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([lat, lon], map.getZoom());
    }
  }, [lat, lon]);

  const agencyPosition: LatLngExpression = [lat, lon];

  return (
    <div>
      <MapContainer
        className="rounded-lg"
        center={agencyPosition}
        zoom={13}
        style={{ height: "300px", width: "100%", marginTop: "20px" }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <Marker position={agencyPosition} icon={AgencyIcon}>
          <Popup>{displayName}</Popup>
        </Marker>
        
        {touristPoints.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lon]} icon={DefaultIcon}>
            <Popup>{point.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AgenciaGeolocation;
