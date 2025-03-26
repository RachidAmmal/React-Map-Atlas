import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import LocationMarker from "./LocationMarker";

const MapCard = () => {
  const position = [38, 7];

  return (
    <div>
      <MapContainer center={position} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapCard;
