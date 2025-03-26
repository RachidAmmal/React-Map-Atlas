import React from "react";
import "./Card.css";

const Card = ({ mapInfo, card }) => {
  return (
    <div className={card}>
      {mapInfo}
    </div>
  );
};

export default Card;
