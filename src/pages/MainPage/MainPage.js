import React, { useEffect } from "react";
import MapCard from "../../components/Map/MapCard";
import Card from "../../components/Card/Card";
import "./MainPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheCenter } from "../../readux/centering-theMap-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";
import { showMyCountry } from "../../readux/map-slice";
import CountryDetails from "../../components/CountryDetails/CountryDetails";

const MainPage = () => {
  const countryName = useSelector((state) => state.country.data?.name);

  const { random } = useSelector((state) => state.random);

  const dispatch = useDispatch();

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
  }, [random]);

  useEffect(() => {
    dispatch(fetchTheCenter(countryName));
  }, [countryName])
  
  console.log(countryName);

  return (
    <div>
      <NavBar />
      <div className="mainCard">
        <Card mapInfo={<CountryDetails countryName={countryName}/>} card="card-c card1" />
        <Card mapInfo={<MapCard />} card="card-c card2" />
      </div>
    </div>
  );
};

export default MainPage;
