import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";

import LocationMarker from "./LocationMarker";
import MapZoomHandler from "./MapZoomHandler ";
import { fetchCountry } from "../../readux/country-name-slice";
import AutoOpenPopup from "./AutoOpenPopup";

const MapCard = () => {
  const dispatch = useDispatch();

  const { m, zoom, loc, clickedLocationMap } = useSelector(
    (state) => state.map
  );

  const { data, loading, error } = useSelector((state) => state.country);

  const [clickedLocation, setClickedLocation] = useState(clickedLocationMap);

  const [zommMap, setzommMap] = useState(zoom);

  const position = clickedLocation === null ? loc : clickedLocation;
  console.log(position)

  useEffect(() => {
    dispatch(fetchCountry(position));
  }, [dispatch, position]);

  let DefaultIcon = L.icon({
    iconUrl: "/images/icons/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      <MapContainer center={position} zoom={zommMap} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          loc={loc}
          zoom={zommMap}
          onMapClick={(location) => {
            setClickedLocation(location);
          }}
        />
        {clickedLocation && (
          <MapZoomHandler location={clickedLocation} newZoom={zommMap} />
        )}
        {m || clickedLocation ? (
          <Marker position={position}>
            {data?.name && <AutoOpenPopup position={position} name={loading
                  ? "Loading..."
                  : error
                  ? `Error: ${error}`
                  : data
                  ? data.name
                  : "Unknown"} />}
          </Marker>
        ) : null}
      </MapContainer>
    </div>
  );
};

export default MapCard;
