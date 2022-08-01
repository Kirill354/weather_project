export const getWeatherData = async (city) => {
    const apiKey = 'ac0101e0d9383a882e220ac49d5e2d1f';
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru&units=metric`);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}