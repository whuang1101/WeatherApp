/* eslint-disable no-param-reassign */
import './hourly_and_daily.css';

function makeDayCard(forecastAPI, listOfDays, cOrF) {
  if (!listOfDays[0]) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < listOfDays.length; index++) {
      const dailyAppend = document.querySelector('.daily');
      // eslint-disable-next-line no-param-reassign
      listOfDays[index] = document.createElement('div');
      listOfDays[index].classList.add('day-format');
      const dayOfWeek = document.createElement('div');
      const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const newDate = new Date(forecastAPI.forecast.forecastday[index + 1].date);
      dayOfWeek.textContent = allDays[newDate.getDay()];
      dayOfWeek.classList.add('day-of-week');
      listOfDays[index].append(dayOfWeek);
      dailyAppend.append(listOfDays[index]);
  
      const temperatures = document.createElement('div');
      temperatures.classList.add('temperature-low-high');
      const highTemp = document.createElement('div');
      highTemp.classList.add('temp-high');
      highTemp.textContent = `${forecastAPI.forecast.forecastday[index + 1].day.maxtemp_f} °F`;
      const lowTemp = document.createElement('div');
      lowTemp.classList.add('temp-low');
      lowTemp.textContent = `${forecastAPI.forecast.forecastday[index + 1].day.mintemp_f} °F`;
      temperatures.append(highTemp);
      temperatures.append(lowTemp);
      listOfDays[index].append(temperatures);

      const weatherIcon = document.createElement('img');
      weatherIcon.src = `${forecastAPI.forecast.forecastday[1 + index].day.condition.icon}`;
      weatherIcon.classList.add('weather-icon');
      listOfDays[index].append(weatherIcon);
    }
  } else {
    for (let index = 0; index < listOfDays.length; index++) {
      if (cOrF === 'C') {
        listOfDays[index].querySelector('.temp-high').textContent = `${forecastAPI.forecast.forecastday[index + 1].day.maxtemp_c} °C`;
        listOfDays[index].querySelector('.temp-low').textContent = `${forecastAPI.forecast.forecastday[index + 1].day.mintemp_c} °C`;
        listOfDays[index].querySelector('.weather-icon').src = `${forecastAPI.forecast.forecastday[1 + index].day.condition.icon}`;
      } else {
        listOfDays[index].querySelector('.temp-high').textContent = `${forecastAPI.forecast.forecastday[index + 1].day.maxtemp_f} °F`;
        listOfDays[index].querySelector('.temp-low').textContent = `${forecastAPI.forecast.forecastday[index + 1].day.mintemp_f} °F`;
        listOfDays[index].querySelector('.weather-icon').src = `${forecastAPI.forecast.forecastday[1 + index].day.condition.icon}`;
      }
    }
  }
  return listOfDays;
}

const first = null;
const second = null;
const third = null;
const fourth = null;
const fifth = null;
const sixth = null;
const seventh = null;
let listOfDays = [first, second, third, fourth, fifth, sixth, seventh];

async function makeDaily(forecastAPI, cOrF) {
  listOfDays = makeDayCard(forecastAPI, listOfDays, cOrF);
}

// eslint-disable-next-line import/prefer-default-export
export { makeDaily };
