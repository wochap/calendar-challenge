//TODO: get API_KEY from env
const API_KEY = '8afe1ac8b23eacb53951edf9fbb171e2';

const weatherService = {
  /**
   * getWeather
   * @param dateISO {string} - in format YYYY-MM-DD
   * @param city {string}
   */
  getWeather(dateISO, city) {
    //TODO: get weather using date and city
    return fetch(`//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then(res => res.json());
  },
};

export default weatherService;
