/* eslint-disable import/prefer-default-export */
// Setting up weather stats

async function makeWeatherStats(response, cOrF) {
  const city = await response.location.name;
  const setTitle = document.querySelector('.place');
  setTitle.textContent = `${city}`;
  const weatherStatus = await response.current.condition.text;
  const setWeatherStatus = document.querySelector('.weather-status');
  setWeatherStatus.textContent = weatherStatus;
  
  // Formatting the date to how I like to see it
  const getLocalDate = await response.location.localtime;
  const date = new Date(getLocalDate);
  const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = allDays[date.getDay()];
  const setLocalDate = document.querySelector('.local-date');
  const setLocalTime = document.querySelector('.local-time');
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    if (hours < 12) {
      minutes += 'AM';
    } else {
      hours -= 12;
      minutes += 'PM';
    }
    setLocalTime.textContent = `${hours}:0${minutes}`;
  } else {
    if (hours < 12) {
      minutes += 'AM';
    } else {
      hours -= 12;
      minutes += 'PM';
    }
    setLocalTime.textContent = `${hours}:${minutes}`;
  }
  setLocalDate.textContent = `${dayOfWeek}, ${allMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const setTemperature = document.querySelector('.temperature');
  const changeTemperature = document.querySelector('.change-temperature');
  if (cOrF === 'C') {
    const getTemperature = await response.current.temp_c;
    setTemperature.textContent = `${getTemperature} °C`;
    changeTemperature.textContent = 'Display °F';
  } else {
    const getTemperature = await response.current.temp_f;
    setTemperature.textContent = `${getTemperature} °F`;
    changeTemperature.textContent = 'Display °C';
  }
  const weatherIcon = document.querySelector('.weather-icon');
  weatherIcon.src = response.current.condition.icon;
}

export { makeWeatherStats };
