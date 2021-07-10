import React from "react";
import "../styles/CurrentWeather.scss";
import { composeDateUsingTimestamp, DATETIME_FORMAT } from "../utils/misc";

function CurrentWeather({ weatherData }) {
  if (!weatherData) return <p>ohh So Empty</p>;

  if (weatherData.error) return <p>{weatherData.error}</p>;

  return (
    <div className="weather-container-current">
      <p className="date-current">
        {composeDateUsingTimestamp(weatherData.dt, DATETIME_FORMAT.dateAndTime)}
      </p>
      <p className="temp-current">{weatherData.temp}°c</p>
      <div className="horizontal-elements-current">
        <p className="feels-like-current">
          Feels like {weatherData?.feels_like}°c &nbsp;
        </p>
        <p className="humidity-current"> / Humidity {weatherData.humidity}%</p>
      </div>
      <p className="weather-description-current">
        {weatherData.weather[0].description}
      </p>
    </div>
  );
}

export default CurrentWeather;
