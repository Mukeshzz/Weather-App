// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '2ec8ec75cf02c35d9de4af0210d33460';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeather = async () => {
    let response; 
    try {
        response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // You can change units to 'imperial' for Fahrenheit
        },
      });

      console.log(typeof(response.data), response);

      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null)
      console.log('response',response);
      setError('Error fetching weather data. Please check the city name and try again.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <input
        type="text"
        placeholder="Enter city"
        className="p-2 border rounded"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      
      <button
        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        onClick={getWeather}
        
      >
        
        Get Weather
        
       
      </button>
      
      {weatherData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="text-lg">{weatherData.weather[0].description}</p>
          <p className="text-3xl font-bold">{weatherData.main.temp} °C</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
    </div>
  );
};

export default Weather;
