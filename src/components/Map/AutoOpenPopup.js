import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";

const AutoOpenPopup = ({ position, name }) => {
  const map = useMap();

  const { random } = useSelector(state => state.random);

  useEffect(
    () => {
      if (position && name) {
        const popup = L.popup({ offset: [0, 0] })
          .setLatLng(position)
          .setContent(name)
          .openOn(map);
      }
    },
    [position, name, map, random]
  );

  return null;
};

export default AutoOpenPopup;
