export default function fetchWeather() {
    return fetch("http://localhost:5000/weather/current")
        .then(res => res.json())
}