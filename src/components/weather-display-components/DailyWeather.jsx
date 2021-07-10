import React from "react";

function DailyWeather({ weatherData }) {
  return <div>{JSON.stringify(weatherData)}</div>;
}

export default DailyWeather;
