import React, { useEffect, useState } from "react";
import "./styles/WeatherApp.scss";
import { useGeoLocation } from "./utils/useGeoLocation";
import { WeatherDisplay } from "./WeatherDisplay";

const api = {
  key: "47e923e89c069b26d17710cacc555c17",
  baseUrl: "http://api.openweathermap.org/data/2.5/",
};

const getWeatherDetailsBasedOnCoordinates = async (latitude, longitude) => {
  try {
    const data = await fetch(
      `${api.baseUrl}onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${api.key}`
    );
    const res = await data.json();
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const getWeatherDetailsBasedOnCityName = async (city) => {
  try {
    const cityRes = await fetch(
      `${api.baseUrl}weather?q=${city}&units=metric&APPID=${api.key}`
    );
    const cityData = await cityRes.json();

    if (cityData.cod === "404") {
      throw new Error(cityData.message);
    }

    const weatherData = await getWeatherDetailsBasedOnCoordinates(
      cityData.coord.lat,
      cityData.coord.lon
    );

    return weatherData;
  } catch (error) {
    throw new Error(error.message);
  }
};

function WeatherApp() {
  const { loaded: isLocationLoaded, coordinates } = useGeoLocation();
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState();

  // When component loads for the first time.
  useEffect(() => {
    if (!isLocationLoaded) return;
    renderBasedOnCoordinates();
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

  if (isLocationLoaded === false) return "Location Loading";

  return (
    <div className="app__container">
      <form onSubmit={handleOnCityNameSubmit}>
        <input
          type="text"
          className="search-bar"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button type="submit">Search</button>
      </form>
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
}

export default WeatherApp;
