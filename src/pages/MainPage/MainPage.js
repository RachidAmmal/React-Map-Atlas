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
import { showMySearch } from "../../readux/country-info";
import BordersCountries from "../../components/CountryDetails/BordersCountries";

const MainPage = () => {
  const countryName = useSelector((state) => state.country.data?.name);

  const { random } = useSelector((state) => state.random);

  const { data, searching } = useSelector((state) => state.countryInfo);

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCountryInfo = () => {
    if (data && searching === true) {
      dispatch(
        showMyCountry({
          m: true,
          zoom: ZOOM_MAP,
          loc: {
            lat: data.latlng[0],
            lng: data.latlng[1]
          },
          clickedLocationMap: null
        })
      );
      dispatch(showMySearch({ searching: false }));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    handleCountryInfo()
  }, [data, countryName, searching, dispatch, handleCountryInfo]);

  useEffect(() => {
    const timeout = setTimeout(() => {
    handleMyLocationRand2();
  }, 300); 

  return () => clearTimeout(timeout);
  }, [random, dispatch, handleMyLocationRand2]);

  useEffect(() => {
    dispatch(fetchTheCenter(countryName));
  }, [countryName, dispatch])

  return (
    <div className="cont">
      <NavBar />
      <div className="mainCard">
        <Card mapInfo={<CountryDetails countryName={countryName}/>} card="card-c card1" />
        <Card mapInfo={<MapCard />} card="card-c card2" />
      </div>
      <BordersCountries/>
    </div>
  );
};

export default MainPage;
