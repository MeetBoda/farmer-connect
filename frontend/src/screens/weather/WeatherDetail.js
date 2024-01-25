import React, { useState } from "react";
import Weather from "./currentLocation";
import "../../App.css"

function WeatherDetail() {
  return (
    <React.Fragment>
      <div className="container">
        <Weather />
      </div>
    </React.Fragment>
  );
}

export default WeatherDetail;