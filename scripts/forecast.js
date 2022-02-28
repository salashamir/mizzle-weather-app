// applying oop
class Forecast {
  constructor() {
    // we want to define 3 properties on our forecast objects: key, baseweather uri, basecity uri
    // dont need to take in any params bc wont have unique properties, wil all use same prop values
    this.key = "ll7gFA9c1yGa1KvjuEDmedt0tsRCbFhV";
    this.weatherURI =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI = `https://dataservice.accuweather.com/locations/v1/cities/search`;
  }
  // now we want to bundle our functions into this class as methods; not only threse two functions, but updatecity as well
  // to add async method to a class:
  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);

    // return object from updatecity
    return {
      // enchanced object mdoern way:
      cityDets,
      weather,
    };
  }
  async getCity(city) {
    // query parameters in separate variables
    // first thing is question mark when adding query parameters to end of api endpoint url; & for another query parameter
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI.concat(query));
    const data = await response.json();

    // take first element because its the closest match
    // will return a single object, but also PROMISE bc async
    return data[0];
  }
  async getWeather(keyID) {
    const query = `${keyID}?apikey=${this.key}`;

    const response = await fetch(this.weatherURI.concat(query));

    const data = await response.json();

    // remember array with only one ibject is returned
    return data[0];
  }
}

// will contain all of our js responsible for interacting with weather API and getting data
// idea behind creating an app when you register: the api is going to provide u with a key
// when we make requests to an API, typicall that API is going to give us an API key so when we make the request we send it w request and they know who made the request/ which app is making it: identification purpose

// const key = "ll7gFA9c1yGa1KvjuEDmedt0tsRCbFhV";

// 1) make request to certain endpoint for city info; will have city code we'll use that code to 2) make second request to a weather conditions api endpoint 3) will send us weather conditions back for that city
// 2 requests to 2 diff endpoints

// make function to do city info request
// take city user input as param to async func
// const getCity = async function (city) {
//   // base url of api endpoint
//   const base = `http://dataservice.accuweather.com/locations/v1/cities/search`;
//   // query parameters in separate variables
//   // first thing is question mark when adding query parameters to end of api endpoint url; & for another query parameter
//   const query = `?apikey=${key}&q=${city}`;
//   // now we can fetch; returns Promise, resolve, pass response to const
//   const response = await fetch(base.concat(query));
//   // turn to data using json method; remember json method returns promise too
//   const data = await response.json();

//   // take first element because its the closest match
//   // will return a single object, but also PROMISE bc async
//   return data[0];
// };

// function to get current conditions - request
// const getWeather = async function (keyID) {
//   const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
//   const query = `${keyID}?apikey=${key}`;

//   const response = await fetch(base.concat(query));

//   const data = await response.json();

//   // remember array with only one ibject is returned
//   return data[0];
// };

// async function returns promise
// TEST
// getCity("Manchester")
//   .then((data) => {
//     // when promise resolves we want to take key off data and pass it into getweather
//     return getWeather(data.Key);
//   })
//   .then((data) => {
//     // this then will fire when promise from getweather is resolved
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// we need key property of object to make second request
// key will go directly in resource url to query second api

// we get array back w single ibject containing weather info
// getWeather("329260");

// WHAT WE WANT to do is hook up form input to make request when user types in value

// OBJECT ORIENTED REVISION: we want to encapsulate everythin that has to do w a forecast in a class
