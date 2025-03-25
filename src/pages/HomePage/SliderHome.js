import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./HomePage.css";

function SliderHome() {
  const [index, setIndex] = useState(0);

  const handleSelect = selectedIndex => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={3000} className="cover-container">
        <img
          className="d-block w-100"
          style={{ height: "100vh", objectFit: "cover" }}
          src="images/slide/atlas1.webp"
          alt="pure pu ladies bag"
        />
        <Carousel.Caption>
          <img
            style={{ marginBottom: "20px" }}
            className="icon"
            src="/images/icons/globe.png"
            alt=""
          />
          <h3>
            Here you can learn all sorts of things about countries or
            territories.
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} className="cover-container">
        <img
          className="d-block w-100"
          style={{ height: "100vh", objectFit: "cover" }}
          src="images/slide/atlas2.webp"
          alt="pure pu ladies bag"
        />
        <Carousel.Caption>
          <img
            style={{ marginBottom: "20px" }}
            className="icon"
            src="/images/icons/critical-thinking.png"
            alt=""
          />
          <h3>
            Take fun quizzes varying in difficulty to test and strengthen your
            knowledge
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} className="cover-container">
        <img
          className="d-block w-100"
          style={{ height: "100vh", objectFit: "cover" }}
          src="images/slide/atlas3.webp"
          alt="pure pu ladies bag"
        />
        <Carousel.Caption>
          <img
            style={{ marginBottom: "20px" }}
            className="icon"
            src="/images/icons/idea.png"
            alt=""
          />
          <h3>Become a Geography buff!</h3>
        </Carousel.Caption>
        <Carousel.Caption />
      </Carousel.Item>
    </Carousel>
  );
}

export default SliderHome;
