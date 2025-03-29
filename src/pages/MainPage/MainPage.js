import React, { useEffect } from "react";
import MapCard from "../../components/Map/MapCard";
import Card from "../../components/Card/Card";
import "./MainPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheCenter } from "../../readux/centering-theMap-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";
import { showMyCountry } from "../../readux/map-slice";
import { fetchTheRandom } from "../../readux/random-country";

const MainPage = () => {
  const countryName = useSelector((state) => state.country.data?.name);

  const { random } = useSelector((state) => state.random);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTheCenter(countryName));
  // }, [countryName]);


  const handleMyLocationRand2 = () => {
    if (random?.lat && random?.lng) {
      dispatch(
        showMyCountry({
          m: true,
          zoom: ZOOM_MAP,
          loc: {
            lat: random.lat,
            lng: random.lng
          },
          clickedLocationMap: null
        })
      );
    }
  };

  useEffect(() => {
    handleMyLocationRand2();
  }, [random ]);

  useEffect(() => {
    dispatch(fetchTheCenter(countryName));
  }, [countryName]);

  return (
    <div>
      <NavBar />
      <div className="mainCard">
        <Card mapInfo={<MapCard />} card="card-c card2" />
        {/* <Card mapInfo={<MapCard />} card="card-c card2" /> */}
      </div>
    </div>
  );
};

export default MainPage;
