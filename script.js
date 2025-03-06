const form = document.getElementById("weatherForm")

const cityInput = document.getElementById("cityInput")

const weatherDisplay = document.getElementById("weatherDisplay")

const errorMessage = document.getElementById("error")

const apiKey = "3d0142fe8fd74e2fa9383251250403"


weatherDisplay.style.display = "none"
errorMessage.style.display = "none"


async function fetchWeatherDetails(){
    
    try{
        const city = cityInput.value.toLowerCase().trim()
        
        if(!city){
            throw new Error ("Please enter a city")
        }

        weatherDisplay.style.display = "block";
        errorMessage.style.display = "none";
        weatherDisplay.innerHTML = `<p>Fetching weather data...</p>`;

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        

        errorMessage.style.display = "none"

        weatherDisplay.innerHTML = `<h2>${data.location.name},${data.location.country}</h2>
        <p>${data.location.region}, ${data.location.tz_id}</p>
        <p>${data.current.temp_c}°C</p>
        <p>${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">`

        cityInput.value = ""
    }

    catch(error){
        weatherDisplay.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.innerHTML = `<h3>Error: ${error.message}</h3>`;
    }
    
}

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    fetchWeatherDetails()
})

