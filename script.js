const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

const container = document.querySelector('.main__container');
const error = document.querySelector('.main__error');

const apiKey = '699eb0a9724785d510749883b5a26d4d';
const apiUrl = 
`https://api.openweathermap.org/data/2.5/weather?q=`;

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
  if(response.status == 404 ) {
    error.style.display='block';
    container.style.display='none';
  }

  const data = await response.json();
  console.log(data);
  document.querySelector('.main__hero h1').innerHTML = Math.floor(data.main.temp - 273) + '°C';
  document.querySelector('.main__hero h2').innerHTML = data.name;
  document.querySelector('#humidity').innerHTML = data.main.humidity + '%';
  document.querySelector('#wind').innerHTML = data.wind.speed + ' km/h';

  const icon = document.querySelector('#weather-icon');
  if(data.weather[0].main == 'Clear') {
    icon.src = "./img/sunny.svg";
  } else if (data.weather[0].main == 'Rain') {
    icon.src = "./img/rain.svg";
  } else if (data.weather[0].main == 'Mist') {
    icon.src = "./img/cloud.svg";
  } else if (data.weather[0].main == 'Drizzle') {
    icon.src = "./img/cloudy.svg";
  }
  container.style.display='block';
  error.style.display='none';

}

searchButton.onclick = function() {
  checkWeather(searchInput.value);
  searchInput.value = '';

  if(searchInput.value === '') {
    error.style.display='block';
    container.style.display='none';
  }
}

searchInput.addEventListener('keydown', (e) => {
  if(e.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = '';
  }

  if(e.target.value === '') {
    error.style.display='block';
    container.style.display='none';
  }
})



