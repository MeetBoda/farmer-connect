import React, { useState } from "react";
import Weather from "./currentLocation";
import "../../App.css"
import Navbar from "../../components/Navbar";

function WeatherDetail() {
  return (
    <React.Fragment>
      <Navbar/>
      <div className="container mt-3 mb-3">
        <Weather />
      </div>
    </React.Fragment>
  );
}

export default WeatherDetail;