import React, { useEffect } from "react";
import MapCard from "../../components/Map/MapCard";
import Card from "../../components/Card/Card";
import "./MainPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheCenter } from "../../readux/centering-theMap-slice";

const MainPage = () => {
  const countryName = useSelector((state) => state.country.data?.name);

  const dispatch = useDispatch();

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
