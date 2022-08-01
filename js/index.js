import { getWeatherData } from "./api.js"
import { createHeader } from "./app-header.js";
import { createMain } from "./app-main.js";

(async function app() {
    const weather = await getWeatherData(JSON.parse(localStorage.getItem('city')) || 'Москва');
    const header = createHeader(weather.name);
    const main = createMain(weather);
    document.body.append(header, main);
}())

export async function render(city, weather) {
    localStorage.setItem('city', JSON.stringify(city))

    document.body.innerHTML = '';
    const header = createHeader(weather.name);
    const main = createMain(weather);
    document.body.append(header, main);
}

// const watchGeoPosition = () => {
//     // console.log(createGeoLocation())
//     const geoCity = createGeoLocation();
//     header.cityLocation.addEventListener('click', await getWeatherData(geoCity))
// }

// app();