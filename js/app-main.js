export const createMain = (data) => {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const inner = document.createElement('div');
    const iconBloc = document.createElement('img');
    const temperature = document.createElement('h2');
    const units = document.createElement('span');
    const description = document.createElement('p');
    const weatherInfo = document.createElement('div');
    const weatherInfoList = document.createElement('ul');
    const weatherInfoWind = document.createElement('li');
    const weatherInfoPressure = document.createElement('li');
    const weatherInfoHumidity = document.createElement('li');
    const weatherInfoClouds = document.createElement('li');

    section.classList.add('weather');
    container.classList.add('container', 'weather__container');
    inner.classList.add('weather__inner');
    iconBloc.classList.add('weather__icon');
    temperature.classList.add('weather__temperature');
    units.classList.add('weather__units');
    description.classList.add('weather__description');
    weatherInfo.classList.add('weather-info');
    weatherInfoList.classList.add('weather-info__list');
    weatherInfoWind.classList.add('weather-info__item');
    weatherInfoHumidity.classList.add('weather-info__item');
    weatherInfoPressure.classList.add('weather-info__item');
    weatherInfoClouds.classList.add('weather-info__item');

    temperature.textContent = Math.floor(data.main.temp);
    const descr = data.weather[0].description;
    description.textContent = descr[0].toUpperCase() + descr.slice(1);
    iconBloc.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    units.textContent = 'o';




    const createDescrTitle = (text) => {
        const span = document.createElement('span');
        span.textContent = text;

        return span;
    }
    const createDescrValue = (text) => {
        const p = document.createElement('p');
        p.textContent = text;

        return p;
    }

    const createWindDegree = (degree) => {
        if (degree > 337.5 && degree <= 22.5) {
            return 'северный';
        } else if (degree > 22.5 && degree <= 67.5) {
            return 'cеверо-восточный';
        } else if (degree > 67.5 && degree <= 112.5) {
            return 'восточный';
        } else if (degree > 112.5 && degree <= 157.5) {
            return 'юго-восточный';
        } else if (degree > 157.5 && degree <= 202.5) {
            return 'южный';
        } else if (degree > 202.5 && degree <= 247.5) {
            return 'юго-западный';
        } else if (degree > 247.5 && degree <= 292.5) {
            return 'западный';
        } else {
            return 'северо-западный';
        }
    }

    weatherInfoWind.append(
        createDescrTitle('Ветер'),
        createDescrValue(data.wind.speed + ' м/с, ' + createWindDegree(data.wind.deg))
    );
    weatherInfoPressure.append(
        createDescrTitle('Давление'),
        createDescrValue(data.main.pressure + ' мм рт. ст.')
    );

    weatherInfoHumidity.append(
        createDescrTitle('Влажность'),
        createDescrValue(data.main.humidity + '%')
    );

    weatherInfoClouds.append(
        createDescrTitle('Облачность'),
        createDescrValue(data.clouds.all + '%')
    );


    main.append(section);
    section.append(container);
    container.append(inner, description, weatherInfo);
    inner.append(iconBloc, temperature, units);
    weatherInfo.append(weatherInfoList);
    weatherInfoList.append(
        weatherInfoWind,
        weatherInfoPressure,
        weatherInfoHumidity,
        weatherInfoClouds
    );

    return main;
}