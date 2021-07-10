import React, { useState } from "react";

const USER_CHOICE = {
  current: "current",
  daily: "daily",
  hourly: "hourly",
};

export const WeatherDisplay = (props) => {
  const { weatherData } = props;
  const [userChoice, setUserChoice] = useState(USER_CHOICE.current);

  const renderViewBasedOnUserChoice = () => {
    switch (userChoice) {
      case USER_CHOICE.daily: {
        return (
          <p style={{ color: "red" }}>{JSON.stringify(weatherData.daily)}</p>
        );
      }
      case USER_CHOICE.hourly: {
        return (
          <p style={{ color: "blue" }}>{JSON.stringify(weatherData.hourly)}</p>
        );
      }
      default:
      case USER_CHOICE.current: {
        return (
          <p style={{ color: "green" }}>
            {JSON.stringify(weatherData.current)}
          </p>
        );
      }
    }
  };

  if (!weatherData) return <p>loading</p>;

  if (weatherData.error) return <p>{weatherData.error}</p>;

  const renderChoices = () => {
    return (
      <>
        <button onClick={() => setUserChoice(USER_CHOICE.current)}>
          CURRENT
        </button>
        <button onClick={() => setUserChoice(USER_CHOICE.daily)}>DAILY</button>
        <button onClick={() => setUserChoice(USER_CHOICE.hourly)}>
          HOURLY
        </button>
      </>
    );
  };

  return (
    <>
      {renderChoices()}
      {renderViewBasedOnUserChoice()}
    </>
  );
};
