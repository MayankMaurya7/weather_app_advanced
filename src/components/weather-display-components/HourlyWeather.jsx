import React from "react";
import { composeDateUsingTimestamp, DATETIME_FORMAT } from "../utils/misc";
import "../styles/HourlyWeather.scss";

function HourlyWeather(props) {
  const weatherData = props;
  const renderHourlyWeather = () => {
    const jsx = weatherData.weatherData.map((weatherData, index) => {
      return (
        <div className="weather-column-hourly" key={index}>
          <p className="date-current">
            {composeDateUsingTimestamp(weatherData.dt, DATETIME_FORMAT.time)}
          </p>
          <p className="temp-hourly">{weatherData?.temp}°c</p>
          <p className="humidity-hourly">Humidity {weatherData.humidity}%</p>
          <p className="weather-description-hourly">
            {weatherData.weather[0].description}
          </p>
        </div>
      );
    });
    return jsx;
  };

  return (
    <div className="weather-container-hourly">{renderHourlyWeather()}</div>
  );
}

export default HourlyWeather;
