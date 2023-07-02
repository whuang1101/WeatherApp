import { makeDaily } from './hourly_and_daily';
import './page-framework.css';
import { makeWeatherStats } from './place-info';
import './place-info.css';
import { makeWeatherStatsRight } from './weather-stats';

async function getWeather(city, cOrF) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=e1afda1b14e34000baa164819233006&q=${city}`, { mode: 'cors' });
    const responseJson = await response.json();
    const forecastAPI = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e1afda1b14e34000baa164819233006&q=${city}&days=10&aqi=no&alerts=no`, { mode: 'cors' });
    const forecastAPIJson = await forecastAPI.json();
    if (!response.ok || !forecastAPI.ok) {
      const searchError = document.querySelector('.error-text');
      searchError.classList.add('show');
      throw new Error('Invalid city');
    } else {
      const searchError = document.querySelector('.error-text');
      searchError.classList.remove('show');
      console.log(responseJson);
      console.log(forecastAPIJson);
      // Setting up weather stats
      makeWeatherStats(responseJson, cOrF);
      makeWeatherStatsRight(responseJson, cOrF, forecastAPIJson);
      makeDaily(forecastAPIJson, cOrF);
    }
  } catch (error) {
    console.error('Error occurred while fetching weather data:', error);
  }
}

function changeTemperature() {
  const changeButton = document.querySelector('.change-temperature');
  const placeTitle = document.querySelector('.place');
  const change = document.querySelector('.change-temperature');
  changeButton.addEventListener('click', () => {
    if (change.textContent === 'Display °F') {
      getWeather(placeTitle.textContent, 'F');
    } else {
      getWeather(placeTitle.textContent, 'C');
    }
  });
}

getWeather('gainesville', 'F');
const searchBar = document.getElementById('city-search');
const searchIcon = document.querySelector('.search');
searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getWeather(searchBar.value);
    searchBar.value = '';
  }
});
searchIcon.addEventListener('click', () => {
  getWeather(searchBar.value);
  searchBar.value = '';
});
changeTemperature();
