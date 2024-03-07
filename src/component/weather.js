import React, { useState } from "react";
import axios from "axios";
import searchIcon from "./assets/search.png";
import cloudIcon from "./assets/cloud.png";
import clearIcon from "./assets/clear.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "2ec8ec75cf02c35d9de4af0210d33460";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const weatherIcons = {
    Clouds: cloudIcon,
    Clear: clearIcon,
    Drizzle: drizzleIcon,
    Rain: rainIcon,
    Snow: snowIcon,
    Haze: windIcon,
    Fog: humidityIcon,
  };

  const handleInputChange = async (e) => {
    const inputCity = e.target.value;
    setCity(inputCity);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });

      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(
        "Error fetching weather data. Please check the city name and try again."
      );
    }
  };

  return (
    <div className="container flex justify-center text-center bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 text-black h-screen">
      <div className='rounded shadow-lg w-full max-w-md'>
        <div className="text-4xl pt-4 font-serif text-white mx-2">
          <h1>Weather Application</h1>
        </div>
        <div className="flex items-center justify-center mt-4">
          <div>
            <input
              type="text"
              placeholder="Enter city"
              className="p-2 border rounded mt-5"
              value={city}
              onChange={handleInputChange}
            />

            <button
              className="bg-white text-white p-2 5 2 5 m-4 rounded"
              onClick={getWeather}
              style={{ zIndex: 1 }}
            >
              <img src={searchIcon} alt="Search Icon" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {weatherData && (
          <div className="mt-20">
            <h2 className="text-4xl text-slate-800 font-semibold">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex items-center justify-center">
              <img
                src={weatherIcons[weatherData.weather[0].main]}
                className="w-10 h-10" // Adjust the width and height as needed
                alt="Weather Icon"
              />
              <p className="text-lg ml-2">
                {weatherData.weather[0].description}
              </p>
            </div>
            <p className="text-3xl font-bold">{weatherData.main.temp} °C</p>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Weather;
