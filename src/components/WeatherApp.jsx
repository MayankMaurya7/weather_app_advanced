import React, { useEffect, useState } from "react";
import "./styles/WeatherApp.scss";
import {
  getWeatherDetailsBasedOnCityName,
  getWeatherDetailsBasedOnCoordinates,
} from "./utils/misc";
import { useGeoLocation } from "./utils/useGeoLocation";
import CurrentWeather from "./weather-display-components/CurrentWeather";
import { WeatherDisplay } from "./WeatherDisplay";

function WeatherApp() {
  const { loaded: isLocationLoaded, coordinates } = useGeoLocation();
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState();
  const [isThemeDark, changeThemeMode] = useState(false);
  const [buttonLable, setButonLable] = useState("Switch to Dark Mode");
  const [themeClass, setThemeClass] = useState("weatherapp-container");

  // When component loads for the first time.
  useEffect(() => {
    if (!isLocationLoaded) return;
    renderBasedOnCoordinates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocationLoaded]);

  const handleOnCityNameSubmit = (e) => {
    e.preventDefault();
    getWeatherDetailsBasedOnCityName(city)
      .then((res) => setWeatherData(res))
      .catch((error) => {
        console.error(error);
        setWeatherData({
          error: `Oops! I've never heard of a city called ${city} `,
        });
      });
  };

  const renderBasedOnCoordinates = () => {
    getWeatherDetailsBasedOnCoordinates(coordinates.lat, coordinates.lng)
      .then((res) => setWeatherData(res))
      .catch((error) => {
        console.error(error);
        setWeatherData({
          error: `Looks like something has gone teribbly wrong!`,
        });
      });
  };

  const handleThemeChange = () => {
    if (!isThemeDark) {
      changeThemeMode(true);
      setButonLable("Switch to Light Mode");
      setThemeClass("weatherapp-container dark-mode");
    } else {
      changeThemeMode(false);
      setButonLable("Switch to Dark Mode");
      setThemeClass("weatherapp-container");
    }
  };

  if (isLocationLoaded === false) return "Location Loading";

  return (
    <div className={themeClass}>
      <button
        onClick={() => handleThemeChange()}
        className="theme-control-button"
      >
        {buttonLable}
      </button>
      <CurrentWeather weatherData={weatherData?.current} />
      <form onSubmit={handleOnCityNameSubmit} className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
}

export default WeatherApp;
