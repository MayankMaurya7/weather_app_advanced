import React from "react";
import { composeDateUsingTimestamp, DATETIME_FORMAT } from "../utils/misc";
import "../styles/DailyWeather.scss";

function DailyWeather(props) {
  const weatherData = props;
  const renderDailyWeather = () => {
    const jsx = weatherData.weatherData.map((weatherData, index) => {
      return (
        <div className="weather-column-Daily" key={index}>
          <p className="date-Daily">
            {composeDateUsingTimestamp(weatherData.dt, DATETIME_FORMAT.date)}
          </p>
          <p className="min/max-temp-Daily">
            {weatherData.temp.min}°c &nbsp; / &nbsp; {weatherData.temp.max}°c
          </p>
          <p className="humidity-Daily">Humidity {weatherData.humidity}%</p>
          <p className="weather-description-Daily">
            {weatherData.weather[0].description}
          </p>
        </div>
      );
    });
    return jsx;
  };

  return <div className="weather-container-Daily">{renderDailyWeather()}</div>;
}

export default DailyWeather;
