import React, { useState } from "react";

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
        return (
          <p style={{ color: "red" }}>{JSON.stringify(weatherData.daily)}</p>
        );
      }
      default:
      case USER_CHOICE.hourly: {
        return (
          <p style={{ color: "blue" }}>{JSON.stringify(weatherData.hourly)}</p>
        );
      }
    }
  };

  const renderChoices = () => {
    return (
      <>
        <button onClick={() => setUserChoice(USER_CHOICE.hourly)}>
          HOURLY
        </button>
        <button onClick={() => setUserChoice(USER_CHOICE.daily)}>DAILY</button>
      </>
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
