/** @format */
const hello = document.querySelector('.hello-container');
const now = document.querySelector('.now');
const city = document.querySelector('.city');
const btn = document.querySelector('.btn');
const temp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const wind = document.querySelector('.wind');
const uv = document.querySelector('.uv');
const infoContainer = document.querySelector('.info-container');
const getImage = document.getElementById('getImage');
const helloContainer = document.querySelector('.hello-container');

btn.addEventListener('click', () => {
  if (infoContainer.style.display == 'none') {
    infoContainer.style.display = 'flex';
    btn.innerHTML =
      'LESS<img src="assets/desktop/icon-arrow-down.svg" id="getImage" />';
  } else {
    infoContainer.style.display = 'none';
    btn.innerHTML =
      'MORE<img src="assets/desktop/icon-arrow-down.svg" id="getImage" />';
  }
});

function fetchWeatherData() {
  const key = '4a526b35ebe74cd98bd195720220302';
  fetch(`https://api.weatherapi.com/v1/current.json?key=4a526b35ebe74cd98bd195720220302&q=auto:ip&aqi=no
  `)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      function updateTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        let hour12 = hours - 12;
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        var t_str = hour12 + ':' + minutes + ' ';
        if (hours < 11) {
          t_str += 'AM';
        } else {
          t_str += 'PM';
        }

        console.log(hours);
        now.innerHTML = t_str;

        if (data.current.is_day) {
          helloContainer.innerHTML = `<img class="icon" src="assets/desktop/icon-sun.svg" alt="" />
            <h2>GOOD MORNING</h2>`;
          document.body.style.backgroundImage = `url(assets/desktop/bg-image-daytime.jpg)`;
        } else {
          helloContainer.innerHTML = `<img class="icon" src="assets/desktop/icon-moon.svg" alt="" />
            <h2>GOOD EVENING</h2>`;
          document.body.style.backgroundImage = `url(assets/desktop/bg-image-nighttime.jpg)`;
        }
      }
      setInterval(updateTime, 1000);

      city.textContent = `${data.location.name}`;
      temp.innerHTML = Math.round(data.current.temp_f) + 'F &#176;';
      feelsLike.innerHTML = Math.round(data.current.feelslike_f) + 'F &#176;';
      wind.innerHTML = Math.round(data.current.wind_mph) + ' MPH';
      uv.innerHTML = `${data.current.uv}`;
    });
}

// fetch weather function

fetchWeatherData();
