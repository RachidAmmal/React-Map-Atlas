import React from "react";
import MapCard from "../../components/Map/MapCard";
import Card from "../../components/Card/Card";
import "./MainPage.css";
import NavBar from "../../components/NavBar/NavBar";

const MainPage = () => {
  return (
    <div>
      <NavBar/>
      <div className="mainCard">
        <Card mapInfo={<MapCard />} card="card-c card1" />
        <Card mapInfo={<MapCard />} card="card-c card2" />
      </div>
    </div>
  );
};

export default MainPage;
