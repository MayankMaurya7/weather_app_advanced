import React, { useState } from "react";
import DailyWeather from "./weather-display-components/DailyWeather";
import HourlyWeather from "./weather-display-components/HourlyWeather";

const USER_CHOICE = {
  daily: "daily",
  hourly: "hourly",
};

export const WeatherDisplay = (props) => {
  const { weatherData } = props;
  const [userChoice, setUserChoice] = useState(USER_CHOICE.current);

  const renderViewBasedOnUserChoice = () => {
    switch (userChoice) {
      case USER_CHOICE.daily: {
        return <DailyWeather weatherData={weatherData.daily} />;
      }
      default:
      case USER_CHOICE.hourly: {
        return <HourlyWeather weatherData={weatherData.hourly} />;
      }
    }
  };

  const renderChoices = () => {
    return (
      <div className="user-choice">
        <button
          className="user-choice-buttons hourly-button"
          onClick={() => setUserChoice(USER_CHOICE.hourly)}
        >
          HOURLY
        </button>
        <button
          className="user-choice-buttons daily-button"
          onClick={() => setUserChoice(USER_CHOICE.daily)}
        >
          DAILY
        </button>
      </div>
    );
  };
  if (!weatherData) return <p>loading</p>;

  if (weatherData.error) return <p>{weatherData.error}</p>;

  return (
    <>
      {renderChoices()}
      {renderViewBasedOnUserChoice()}
    </>
  );
};
