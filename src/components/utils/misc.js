export const API = {
  key: "47e923e89c069b26d17710cacc555c17",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

export const getWeatherDetailsBasedOnCoordinates = async (
  latitude,
  longitude
) => {
  try {
    const data = await fetch(
      `${API.baseUrl}onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${API.key}`
    );
    const res = await data.json();
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const getWeatherDetailsBasedOnCityName = async (city) => {
  try {
    const cityRes = await fetch(
      `${API.baseUrl}weather?q=${city}&units=metric&APPID=${API.key}`
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
export const DATETIME_FORMAT = {
  date: "date",
  time: "time",
  dateAndTime: "dateAndTime",
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const composeDateUsingTimestamp = (
  timestamp,
  format = DATETIME_FORMAT.date
) => {
  const date = new Date(timestamp * 1000).getDate();
  const day = DAYS[new Date(timestamp * 1000).getDay()];
  const month = MONTHS[new Date(timestamp * 1000).getMonth()];
  const hours = new Date(timestamp * 1000).getHours();
  const minutes = new Date(timestamp * 1000).getMinutes();

  const composeTime = () => {
    const composeHours = hours >= 12 ? hours - 12 : hours;
    const amPm = hours >= 12 ? "PM" : "AM";
    return `${" "}${composeHours}:${minutes} ${amPm}`;
  };

  const composeDate = () => `${day} ${date} ${month}`;

  switch (format) {
    case DATETIME_FORMAT.dateAndTime:
      return `${composeDate()} ${composeTime()}`;
    case DATETIME_FORMAT.date:
    default:
      return `${composeDate()}`;
    case DATETIME_FORMAT.time:
      return `${composeTime()}`;
  }
};
