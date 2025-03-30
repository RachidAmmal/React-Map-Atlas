import React from "react";
import { MapPin, Globe, Puzzle, Flag } from "lucide-react";
import "./Information.css";

const Information = () => {
  return <div className="">
      <div className="cardInfo">
        <h2 className="cardTitle">
          🤓 Discover the World at Your Fingertips!
        </h2>
        <p className="cardSubtitle">
          Interact with the map, test your knowledge, and explore details
          about any country in an immersive way.
        </p>
        <div className="card-content">
          <div className="card-item">
            <h3 className="iconInfo blue">🌍</h3>
            <div>
              <h3 className="item-title">Explore Countries</h3>
              <p className="item-description">
                Click on any country on the map to instantly access its
                essential details like capital, population, and more.
              </p>
            </div>
          </div>
          <div className="card-item">
            <h3 className="iconInfo green">🧠</h3>
            <div>
              <h3 className="item-title">Test Your Knowledge</h3>
              <p className="item-description">
                Take a fun quiz to challenge yourself and see how well you
                know the world map!
              </p>
            </div>
          </div>
          <div className="card-item">
            <h3 className="iconInfo red">
              <MapPin className="iconInfo red" />
            </h3>
            <div>
              <h3 className="item-title">Know Your Country</h3>
              <p className="item-description">
                Enable location services to find out interesting facts and
                statistics about the country you’re currently in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Information;
