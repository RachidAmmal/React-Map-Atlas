import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useDispatch } from "react-redux";
import { showMyCountry } from "../../readux/map-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";

const LocationMarker = ({ loc, zoom, onMapClick }) => {
  const map = useMap();

  const dispatch = useDispatch();

  //const { loc } = useSelector(state => state.map);

  useEffect(
    () => {
      if (loc.lat !== 0 && loc.lng !== 0) {
        map.setView([loc.lat, loc.lng], zoom);
      }
    },
    [loc, map]
  );

  useMapEvents({
    click: e => {
      const { lat, lng } = e.latlng;
      dispatch(showMyCountry({
          zoom: ZOOM_MAP,
          loc: { lat: lat, lng: lng }
        }));
      onMapClick({ lat, lng });
    }
  });

  return null;
};

export default LocationMarker;
