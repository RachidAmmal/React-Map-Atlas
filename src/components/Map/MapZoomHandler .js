import { useState } from "react";
import { useMap } from "react-leaflet";

const MapZoomHandler = ({ location, newZoom }) => {
  const [zoom, setZoom] = useState(6);
  const map = useMap();
  if (location) {
    map.flyTo([location.lat, location.lng], newZoom);
  }
  return null;
};

export default MapZoomHandler;
