import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./Map.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";

import LocationMarker from "./LocationMarker";
import MapZoomHandler from "./MapZoomHandler ";
import { fetchCountry } from "../../readux/country-name-slice";
import AutoOpenPopup from "./AutoOpenPopup";

const MapCard = () => {
  const dispatch = useDispatch();

  const prevDataNameRef = useRef(null);

  const { m, zoom, loc, clickedLocationMap } = useSelector(
    (state) => state.map
  );

  const { data, loading, error } = useSelector((state) => state.country);

  const { country } = useSelector((state) => state.random);

  const data1 = useSelector((state) => state.countryInfo.data);

  const {center} = useSelector((state) => state.center);

  const [clickedLocation, setClickedLocation] = useState(clickedLocationMap);

  const [zommMap, setzommMap] = useState(zoom);

  const position = clickedLocation === null ? loc : clickedLocation;
  const position1 = data1?.latlng && center;

  console.log(position);

  useEffect(() => {
    dispatch(fetchCountry(position));
  }, [dispatch, position]);

  useEffect(() => {
    if (data?.name) {
      prevDataNameRef.current = data.name;
    }
    if (data1?.name?.common) {
      prevDataNameRef.current = data1.name.common;
    }
  }, [data?.name, data1?.name?.common]);

  let DefaultIcon = L.icon({
    iconUrl: "/images/icons/marker-icon.png",
    iconSize: [25, 41],
    
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
          data={data}
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
          <div position={position}>
            {data?.name && data.name !== prevDataNameRef.current ? (
              <AutoOpenPopup
                position={position}
                name={
                  loading
                    ? "Loading..."
                    : error
                    ? `Error: ${error}`
                    : `${data.name} ${data.code ?? ""}`
                }
              />
            ) : data1?.name?.common ? (
              <AutoOpenPopup
                position={position1}
                name={
                  loading
                    ? "Loading..."
                    : error
                    ? `Error: ${error}`
                    : data1.name.common
                }
              />
            ) : <AutoOpenPopup position={position} name={country} />}
          </div>
        ) : null}
      </MapContainer>
    </div>
  );
};

export default MapCard;
