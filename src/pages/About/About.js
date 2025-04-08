import React from "react";
import "./About.css";
import NavBar from "../../components/NavBar/NavBar";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <>
      <NavBar />
    <div className="about-container">
      <h1 className="about-title">About</h1>
      <p className="about-text">
        This web application was crafted with 💙 by A. Rachid. It began as a
        personal challenge to test and showcase my skills as a web developer.
        Throughout the journey, I’ve been driven by a deep passion for coding
        and an unwavering commitment to growth. This project was built with
        complete objectivity and is intended solely for educational purposes. It
        does not reflect any political stance or personal ideology. The source
        code is open to the public, and I warmly welcome contributions from
        anyone on <a
            href="https://github.com/RachidAmmal/React-Map-Atlas"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>.
      </p>

      <div className="contact-section">
        <h2>Contact Me</h2>
        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/rachid-a-66a356204"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://github.com/RachidAmmal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://rachidammal.github.io/my-portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe /> Portfolio
          </a>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <ul>
          <li>
            <a
              href="https://restcountries.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              REST Countries
            </a>
          </li>
          <li>
            <a
              href="https://nominatim.openstreetmap.org/ui/search.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nomination
            </a>
          </li>
          <li>
            <a
              href="https://geocodify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Geocodify
            </a>
          </li>
        </ul>
      </div>
    </div></>
  );
};

export default About;
