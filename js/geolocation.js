import { getWeatherData } from "./api.js";
import { render } from "./index.js"


export const createGeoLocation = () => {


    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    const success = async (position) => {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=ru&apiKey=530810d3a74246f78c1a9cd6470fcab7`);
        const data = await response.json();

        const weather = await getWeatherData(data.features[0].properties.city);
        render(data.features[0].properties.city, weather);
    }

    const error = (err) => {
        console.log(err.code + ' ' + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

}