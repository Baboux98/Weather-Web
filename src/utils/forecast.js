const request = require("request");

const forecast = (latitude, longitude, callback) => {
 //console.log(latitude,longitude)
  const url =
    "http://api.weatherstack.com/current?access_key=df6f82c55edff165eb9ef2a5bc353980&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out but it feels like " +
          body.current.feelslike +
          " degress out."
      );
    }
  });
};
module.exports = forecast;
