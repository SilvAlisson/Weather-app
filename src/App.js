import React, { useState } from "react";
import './index.css'
import { getWeatherData } from "./Api";

import clearDay from './assets/day/clear.jpg';
import clearNight from './assets/night/clear.jpg';
import cloudyDay from './assets/day/cloudy.jpg';
import cloudyNight from './assets/night/cloudy.jpg';
import mistDay from './assets/day/mist.jpg';
import mistNight from './assets/night/mist.jpg';
import rainyDay from './assets/day/rainy.jpg';
import rainyNight from './assets/night/rainy.jpg';
import snowyDay from './assets/day/snowy.jpg';
import snowyNight from './assets/night/snowy.jpg';

const getBackgroundImage = (weatherData) => {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour <= 18;

  switch (weatherData.weather[0].main) {
    case 'Clear':
      return isDay ? clearDay : clearNight;
    case 'Clouds':
      return isDay ? cloudyDay : cloudyNight;
    case 'Mist':
    case 'Fog':
      return isDay ? mistDay : mistNight;
    case 'Rain':
      return isDay ? rainyDay : rainyNight;
    case 'Snow':
      return isDay ? snowyDay : snowyNight;
    default:
      return isDay ? clearDay : clearNight;
  }
};

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const backgroundImage = data ? getBackgroundImage(data) : './assets/day/earth.jpg';

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const weatherData = await getWeatherData(location);
      setData(weatherData);
      console.log(weatherData);
      setLocation("");
    }
  };

  const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", }}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="insira a localização"
          required
          type="text"
        />
      </div>
      <div className="container">
        {data && (
          <>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
            </div>
            <div className="temp">
              <h1>{Math.round(data.main.temp - 273.15)}°C</h1>
              <div className="icon">
                <img
                  src={getWeatherIcon(data.weather[0].icon)}
                  alt={data.weather[0].description}
                />
              </div>
            </div>
            <div className="description">
              <p>{data.weather[0].description}</p>
            </div>
            <div className="bottom">
              <div className="feels">
                <p className="bold">
                  {Math.round(data.main.feels_like - 273.15)}°C
                </p>
                <p>Sensação térmica</p>
              </div>
              <div className="humidity">
                <p className="bold">{data.main.humidity}%</p>
                <p>Umidade</p>
              </div>
              <div className="wind">
                <p className="bold">{Math.round(data.wind.speed * 3.6)} km/h</p>
                <p>Velocidade do vento</p>
              </div>
              <div className="max-temp">
                <p className="bold">{Math.round(data.main.temp_max - 273.15)}°C</p>
                <p>Temperatura máxima/dia</p>
              </div>
              <div className="min-temp">
                <p className="bold">{Math.round(data.main.temp_min - 273.15)}°C</p>
                <p>Temperatura mínima/dia</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
