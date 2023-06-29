import React from "react";
import "./Header.css";
import logo from "../images/michael.jpeg";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>Michael AI</h1>
      </div>
      
    </>
  );
};

export default Header;
