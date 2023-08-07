const searchText = document.querySelector(".search");
const search = document.querySelector(".searchBox");
const locationName = document.querySelector(".name");
const weather = document.querySelector(".weather");
const unit = document.querySelectorAll(".tempUnit");
const error = document.querySelector(".error");
const btn = document.querySelector(".unit button");
const speed = document.querySelector(".speed")

setTimeout(function () {
    document.querySelector(".container").style.display = "flex"
    document.querySelector(".loader-div").style.display = "none"
}, 1000)


speed.innerText = "kph"


for (let units of unit) {
    units.innerText = "°C"
}

let tempC = ''
let tempF = ''
let feelsLikeC = ''
let feelsLikeF = ''
let speedMph = ''
let speedKph = ''


// default function for fetch weather

const fetchWeather = async (input = "new delhi") => {
    try {

        weather.style.display = "flex"
        error.style.display = "none"

        apiKey = "098ac98f3dbe40ad92072233230708"
        let api = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}`)
        let apidata = await api.json();
        console.log(apidata)
        
        let [date, time] = apidata.location.localtime.split(" ");
        let clouds = apidata.current.condition.text
        tempC = apidata.current.temp_c
        tempF = apidata.current.temp_f
        feelsLikeC = apidata.current.feelslike_c
        feelsLikeF = apidata.current.feelslike_f
        speedMph = apidata.current.wind_mph
        speedKph = apidata.current.wind_kph
        
        locationName.innerText = apidata.location.name
        document.querySelector(".time").innerText = time
        document.querySelector(".temp").innerText = `${Math.round(tempC)}`
        document.querySelector(".feelsLike").innerText = `Feels like ${Math.round(feelsLikeC)}`
        document.querySelector(".clouds").innerText = clouds
        document.querySelector(".windSpeed").innerText = `Wind Speed : ${speedKph}`
        document.querySelector(".humidity").innerText = `Humidity : ${apidata.current.humidity} %`

    } catch (e) {
        weather.style.display = "none"
        error.style.display = "block"
    }
}

search.addEventListener('submit', async (e) => {
    e.preventDefault()
    let input = searchText.value;
    console.log(input);
    for (let units of unit) {
        units.innerText = "°C"
    }
    speed.innerText = "kph";

    fetchWeather(input);
    searchText.value = ""
})




btn.addEventListener('click', function () {
    if (unit[0].innerText === "°C" || speed.innerText === "kph") {
        for (let units of unit) {
            units.innerText = "°F"
        }
        document.querySelector(".temp").innerText = tempF
        document.querySelector(".feelsLike").innerText = feelsLikeF

        speed.innerText = "mph"
        document.querySelector(".windSpeed").innerText = `Wind Speed : ${speedMph}`
    }
    else {
        for (let units of unit) {
            units.innerText = "°C"
        }
        document.querySelector(".temp").innerText = tempC
        document.querySelector(".feelsLike").innerText = feelsLikeC
        speed.innerText = "kph"
        document.querySelector(".windSpeed").innerText = `Wind Speed : ${speedKph}`
    }
})

fetchWeather();


// search.addEventListener('submit' , async(e) =>{
//     e.preventDefault()
//     let input = searchText.value;
//     console.log(input);

//     try{
//     weather.style.display = "flex"
//     error.style.display = "none"
//     apiKey = "098ac98f3dbe40ad92072233230708"
//     let api = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}`)
//     let apidata = await api.json();
//     let [date , time] = apidata.location.localtime.split(" ");
//     let clouds =apidata.current.condition.text
//     console.log(apidata)
//     locationName.innerText = apidata.location.name

//     tempC = apidata.current.temp_c
//     tempF = apidata.current.temp_f
//     feelsLikeC = apidata.current.feelslike_c
//     feelsLikeF = apidata.current.feelslike_f

//     document.querySelector(".time").innerText = time
//     document.querySelector(".temp").innerText = `${Math.round(tempC)}`
//     document.querySelector(".feelsLike").innerText = `Feels like ${feelsLikeC}`
//     document.querySelector(".clouds").innerText = clouds
//     document.querySelector(".windSpeed").innerText = `Wind Speed : ${apidata.current.wind_kph} kmph`
//     document.querySelector(".humidity").innerText = `Humidity : ${apidata.current.humidity} %`

//     } catch(e){
//         weather.style.display = "none"
//         error.style.display = "block"
//     }

//     searchText.value=""
// })


