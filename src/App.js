import React, { useState } from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import { API_KEY, API_URL } from './api';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  // fetch weather data
  const getWeather = async (city) => {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherForm getWeather={getWeather} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default App;
