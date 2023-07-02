/* eslint-disable import/prefer-default-export */
import './weather-stats.css';

async function makeWeatherStatsRight(response, cOrF, forecastAPIJson) {
  const feelsLike = document.querySelector('.feels-like-temp');
  const humidityText = document.querySelector('.humidity-number');
  const humidityNumber = `${response.current.humidity} %`;
  humidityText.textContent = humidityNumber; 
  
  const chanceOfRainText = document.querySelector('.rain-chance-number');
  const chanceOfRainNumber = `${forecastAPIJson.forecast.forecastday[0].day.daily_chance_of_rain}`;
  chanceOfRainText.textContent = `${chanceOfRainNumber} %`;

  const windSpeedText = document.querySelector('.wind-speed-number');

  if (cOrF === 'F') {
    const windSpeedNumber = `${response.current.wind_mph} mph`;
    const feelsLikeTemp = `${response.current.feelslike_f} °F`;
    windSpeedText.textContent = windSpeedNumber;
    feelsLike.textContent = feelsLikeTemp;
  } else {
    const windSpeedNumber = `${response.current.wind_kph} km/h`;
    const feelsLikeTemp = `${response.current.feelslike_c} °C`;
    feelsLike.textContent = feelsLikeTemp;
    windSpeedText.textContent = windSpeedNumber;
  }
}
export { makeWeatherStatsRight };
