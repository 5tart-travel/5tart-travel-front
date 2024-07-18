import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon, Map as LeafletMap } from "leaflet";
import axios from "axios";

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

interface MapsAgenciaProps {
  address: string;
}

const MapsAgencia: React.FC<MapsAgenciaProps> = ({ address }) => {
  const mapRef = useRef<LeafletMap>(null);
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`https://fivetart-travel-kafg.onrender.com/maps/geocode`, {
          address: address,
        });

        if (response.data && response.data.lat && response.data.lon) {
          const { lat, lon } = response.data;
          setLocation([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error("No se encontraron coordenadas válidas para la dirección proporcionada.");
        }
      } catch (error) {
        console.error("Error al obtener las coordenadas:", error);
      } finally {
        setMapReady(true);
      }
    };

    fetchData();
  }, [address]);

  if (!mapReady) {
    return null; 
  }

 return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="text-xl font-bold text-white mt-4 mb-4">DONDE ENCONTRARNOS</div>
        <MapContainer
            className="rounded-lg"
            center={location || [0, 0]} 
            zoom={location ? 16 : 1} 
            style={{ height: "350px", width: "95%", marginTop: "10px", marginBottom: "20px" }}
            ref={mapRef}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {location && (
                <Marker position={location}>
                    <Popup>{address}</Popup>
                </Marker>
            )}
        </MapContainer>
    </div>
);

};

export default MapsAgencia;
