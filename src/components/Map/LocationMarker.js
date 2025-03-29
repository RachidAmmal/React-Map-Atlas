import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { showMyCountry } from "../../readux/map-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";
import { fetchTheCenter } from "../../readux/centering-theMap-slice";

const LocationMarker = ({ loc, zoom, onMapClick }) => {
  const map = useMap();

  const dispatch = useDispatch();

  const countryName = useSelector((state) => state.country.data?.name);

  useEffect(() => {
    if (loc.lat !== 0 && loc.lng !== 0) {
      map.setView([loc.lat, loc.lng], zoom);
    }
  }, [loc, map]);

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      dispatch(
        showMyCountry({
          zoom: ZOOM_MAP,
          loc: {
            lat: lat,
            lng: lng
          }
        })
      );
      onMapClick({
        lat,
        lng
      });
      dispatch(fetchTheCenter(countryName));
    }
  });

  return null;
};

export default LocationMarker;
