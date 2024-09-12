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
    <div className="flex justify-center items-center bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 text-black min-h-screen">
      <div className="rounded-lg shadow-2xl bg-white p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <div className="text-4xl font-serif text-gray-700 mb-4">
          <h1>Weather App</h1>
        </div>
        <div className="flex items-center justify-center mb-8">
          <input
            type="text"
            placeholder="Enter city"
            className="p-2 w-full border rounded-lg text-gray-700"
            value={city}
            onChange={handleInputChange}
          />
          <button
            className="ml-4 p-2 bg-blue-500 rounded-full hover:bg-blue-700 transition-all duration-300"
            onClick={getWeather}
          >
            <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
          </button>
        </div>

        {weatherData && (
          <div className="text-center transition-transform transform hover:scale-110 duration-700">
            <h2 className="text-3xl font-bold text-gray-800">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex justify-center items-center mt-4 mb-4">
              <img
                src={weatherIcons[weatherData.weather[0].main]}
                className="w-16 h-16"
                alt="Weather Icon"
              />
              <p className="text-xl text-gray-700 ml-4 capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>
            <p className="text-4xl font-bold text-blue-600">
              {weatherData.main.temp} °C
            </p>
            <div className="mt-4">
              <p className="text-gray-600">
                Humidity: {weatherData.main.humidity}%
              </p>
              <p className="text-gray-600">
                Wind: {weatherData.wind.speed} m/s
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-lg mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Weather;

