const searchBar = document.querySelector(".search-bar")

const api = {
    key: "3c23c145c9f54acc631857e3cf7de47e",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.key)
            .then((response) => {
                if(!response.ok) alert("Weather not found")

                return response.json()
            })
            .then((data) => this.weatherFunction(data))
    },

    weatherFunction: function(data) {
        const wind = data.wind.speed
        const cityName = data.name
        const { temp, humidity } = data.main
        const { icon, description } = data.weather[0]

        const fahrenheitToCelsius = (temp - 273).toFixed(0)

        document.querySelector(".city").innerHTML = `Weather in ${cityName}`
        document.querySelector(".temp").innerHTML = fahrenheitToCelsius + "°C"
        document.querySelector(".description").innerHTML = description
        document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`
        document.querySelector(".wind").innerHTML = `Wind speed: ${wind} km/h`

        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;

        document.querySelector(".weather").classList.remove("loading")
    },

    search: function() {
        this.fetchWeather(searchBar.value)
    }
}

document.querySelector("button").addEventListener("click", () => {
    api.search()
})

searchBar.addEventListener("keyup", (event) => {
    if(event.keyCode == 13){
        api.search()
    }
})