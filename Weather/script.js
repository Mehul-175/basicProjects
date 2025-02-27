document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput = document.getElementById('city-input');
    const getButton = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const emptyInput = document.getElementById('empty-field');
    const loadingText = document.getElementById("loading")
    const API_Key = "217e13f9654b97851a7860a9164f0cd7";

    getButton.addEventListener('click', async ()=>{
        const city = cityInput.value.trim();
        if(!city){
            emptyField();
            return;
        }
        try {
            loadingText.classList.remove('hidden')
            weatherInfo.classList.add('hidden');
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
            weatherInfo.classList.remove('hidden');
        } catch (error) {
            showError();
        } finally{
            loadingText.classList.add('hidden')
        }
    })
    async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`;
        const response = await fetch(url);
        console.log("RESPONSE", response);
        if(!response.ok){
            showError();
            return;
        }
        const data = await response.json();
        return data;
    }
    
    function displayWeatherData(data){
        //display the data
        emptyInput.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        errorMessage.classList.add('hidden');
        console.log(data);
        cityName.textContent = `City: ${data.name}`
        temperatureDisplay.textContent = `Temperature: ${data.main.temp}`
        descriptionDisplay.textContent = `Description: ${data.weather[0].description}`
        // saveTask();
        weatherInfo.classList.remove('hidden');
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
    function emptyField(){
        errorMessage.classList.add('hidden');
        weatherInfo.classList.add('hidden');
        emptyInput.classList.remove('hidden');
    }

})