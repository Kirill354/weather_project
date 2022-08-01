import { getWeatherData } from "./api.js";
import { createGeoLocation } from "./geolocation.js";
import { render } from "./index.js";


export const createHeader = (city) => {
    const header = document.createElement('header');
    const headerContainer = document.createElement('div');
    const headerCity = document.createElement('div');
    const headerUnits = document.createElement('div');
    const cityChange = document.createElement('button');
    const cityLocation = document.createElement('button');
    const cityName = document.createElement('h1');
    const unitsC = document.createElement('button');
    const unitsF = document.createElement('button');
    const cityInner = document.createElement('div');
    const searchBlock = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchBtn = document.createElement('button');
    const errorBlock = document.createElement('p');


    header.classList.add('header');
    headerContainer.classList.add('container', 'header__container');
    headerCity.classList.add('header__city');
    headerUnits.classList.add('header__units');
    cityChange.classList.add('city__change', 'btn-reset');
    cityLocation.classList.add('city__location', 'btn-reset');
    cityName.classList.add('header__name');
    cityInner.classList.add('header__inner');
    unitsC.classList.add('units__c', 'btn-reset', 'unit-current');
    unitsF.classList.add('units__f', 'btn-reset');
    searchBlock.classList.add('search');
    searchInput.classList.add('search__input');
    searchBtn.classList.add('search__btn');
    errorBlock.classList.add('search__error');

    searchBlock.append(searchInput, searchBtn, errorBlock);
    searchBtn.textContent = 'ok';
    cityName.textContent = city;
    cityChange.textContent = 'Сменить город';
    cityLocation.textContent = 'Моё местоположение';
    unitsC.textContent = 'C';
    unitsF.textContent = 'F';



    // F/C
    const changeWeatherUnits = (weatherUnit, value) => {
        if (weatherUnit === 'C') {
            return Math.round((value - 32) / 1.8);
        } else {
            return Math.round(value * 1.8 + 32);
        }
    }

    unitsC.addEventListener('click', function () {
        if (this.classList.contains('unit-current')) return;

        this.classList.add('unit-current');
        unitsF.classList.remove('unit-current');

        let weatherUnit = document.querySelector('.weather__units');
        weatherUnit.textContent = 'o';

        let weatherDegrees = document.querySelector('.weather__temperature');
        weatherDegrees.textContent = changeWeatherUnits('C', parseInt(weatherDegrees.textContent));

    })
    unitsF.addEventListener('click', function () {
        if (this.classList.contains('unit-current')) return;

        this.classList.add('unit-current');
        unitsC.classList.remove('unit-current');

        let weatherUnit = document.querySelector('.weather__units');
        weatherUnit.textContent = 'f';

        let weatherDegrees = document.querySelector('.weather__temperature');
        weatherDegrees.textContent = changeWeatherUnits('F', parseInt(weatherDegrees.textContent));
    })

    // Клик для геолокации
    cityLocation.addEventListener('click', createGeoLocation);

    // Для ошибьчного сообщения
    const showMessage = (message) => {
        errorBlock.classList.add('show-error');
        errorBlock.textContent = message;
    }

    cityChange.addEventListener('click', () => {
        headerCity.innerHTML = '';
        headerCity.append(searchBlock);

        // window.addEventListener('click', (e) => {
        //     if (e.target == searchBtn || e.target == searchInput || e.target == cityChange) {
        //         return;
        //     } else {
        //         headerCity.innerHTML = '';
        //         errorBlock.classList.remove('show-error');
        //         searchInput.value = '';
        //         headerCity.append(cityName, cityInner);
        //     }
        // })
    });
    searchBtn.addEventListener('click', async () => {
        if (!(searchInput.value)) {
            return;
        }
        try {
            const weather = await getWeatherData(searchInput.value);
            if (weather.message) {
                showMessage(weather.message);
                return;
            }
            render(searchInput.value, weather)
        } catch (error) {
            console.log(error);
        }
    })


    header.append(headerContainer);
    headerContainer.append(headerCity, headerUnits);
    cityInner.append(cityChange, cityLocation);
    headerCity.append(cityName, cityInner);
    headerUnits.append(unitsC, unitsF);


    return header;

}