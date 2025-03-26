import React, { useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from "leaflet";
import "./Map.css";

let DefaultIcon = L.icon({
  iconUrl: "/images/icons/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker() {
  const [position, setPosition] = useState(null);

  let m = true 

  const map = useMapEvents({
    click() {
      m && map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  

  return position === null
    ? null
    : <Marker position={position}>
        <Popup className='popup'>You are here</Popup>
      </Marker>;
}



export default LocationMarker