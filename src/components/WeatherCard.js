import React from 'react';
import { URL } from '../api';

const WeatherCard = ({ weatherData }) => {
  const { name, main, weather } = weatherData;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p className="temperature">{main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p className="weather-description">{weather[0].description}</p>
      <img
        src={`${URL}img/w/${weather[0].icon}.png`}
        alt="Weather Icon"
        className="weather-icon"
      />
    </div>
  );
};

export default WeatherCard;
