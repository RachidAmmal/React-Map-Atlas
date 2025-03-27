import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const AutoOpenPopup = ({ position, name }) => {
  const map = useMap();

  useEffect(
    () => {
      if (position && name) {
        const popup = L.popup({ offset: [3, -30] })
          .setLatLng(position)
          .setContent(name)
          .openOn(map); 
      }
    },
    [position, name, map]
  );

  return null; 
};

export default AutoOpenPopup