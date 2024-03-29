const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/7a9383085bff8cc71a62aa0a8517e03a/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services");
    } else if (body.error) {
      callback(body.error);
    } else {
      console.log('weather data: ', body)
      const currentTemp = body.currently.temperature;
      const chanceRain = body.currently.precipProbability;
      const wind = body.currently.windSpeed
      callback(
        undefined,
        body.daily.data[0].summary +
          "It is currently " +
          currentTemp +
          " degrees. There is " +
          chanceRain +
          "% chance of rain. The current wind speed is " + wind + " knots"
      );
    }
  });
};

module.exports = forecast;
