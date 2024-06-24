// working with API
const apiKey = `9315263bc4be55582226d6515a9ff351`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

let tempC = null;

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
        
        if(!response.ok)
            throw new Error(`Invalid city: ${city}`);

        const data = await response.json();
        
        tempC = Math.round(data.main.temp);
        tempEl.innerHTML = tempC;
        cityEl.innerHTML = data.name;
        pressEl.innerHTML = data.main.pressure;
        humidEl.innerHTML = data.main.humidity;

        errorEl.style.display = 'none';

        // checking weather status
        let status = data.weather[0].main;
        let source = null;

        if(status === 'Clear')
            source = `./img/clear.png`;
        else if(status === 'Clouds')
            source = `./img/cloudy.png`;
        else if(status === 'Mist')
            source = `./img/misty.png`;
        else if(status === 'Rain')
            source = `./img/rainy.png`;
        else
            source = `./img/drizzle.png`;

        imageEl.src = source;
    }
    catch(err){
        errorEl.innerHTML = err;
        errorEl.style.display = 'block';
    }
}

getWeather('ottawa');

// Farenheit or Celcius
const cButton = document.querySelector('.typec');
const fButton = document.querySelector('.typef');
const tempSignEl = document.querySelector('.temp__sign');

const changeTempUnit = evt => {
    if(evt.target.classList.contains('typef')){
        let tempF = Math.round((tempC * 1.8) + 32);
        tempEl.innerHTML = tempF;
        tempSignEl.innerHTML = 'F';
    } else {
        tempEl.innerHTML = tempC;
        tempSignEl.innerHTML = 'C';
    }
}

fButton.addEventListener('click', changeTempUnit);
cButton.addEventListener('click', changeTempUnit);

// choosinge HTML elements
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const errorEl = document.querySelector('.error');
const imageEl = document.querySelector('.image');
const cityEl = document.querySelector('.city');
const tempEl = document.querySelector('.temp__span');
const humidEl = document.querySelector('.humid');
const pressEl = document.querySelector('.airpress');

// handling form
const handleForm = evt => {
    evt.preventDefault();
    let value = input.value.trim();

    if(!value){
        errorEl.innerHTML = `Enter city name`;
        input.value = '';
        errorEl.style.display = 'block';
        return;
    }

    input.value = '';
    getWeather(value);
}

form.addEventListener('submit', handleForm);