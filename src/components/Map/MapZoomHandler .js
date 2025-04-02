import { useMap } from "react-leaflet";

const MapZoomHandler = ({ location, newZoom }) => {
  const map = useMap();
  if (location) {
    map.flyTo([location.lat, location.lng], newZoom);
  }
  return null;
};

export default MapZoomHandler;
