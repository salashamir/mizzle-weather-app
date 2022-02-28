// js file for all of our dom manipulation, showing things on the page, event handling
// get form refrence
const cityForm = document.querySelector("form");
// dom refrences
const card = document.querySelector(".card");
const details = document.querySelector(".details");
// image and icon
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
// create new instance of forecast class
const forecast = new Forecast();

// external function to be called in eventlistener callback
// will be async because inside it we'll be calling getcityand getweather from other file, they are both async so this one will also be async and take some time to complete
// const updateCity = async function (city) {
//   // test: works!
//   // console.log(city);
//   // city details; use await since getcityr returns promise, so we can make sure its finished and resolves befroe we assign to citydets
//   const cityDets = await getCity(city);
//   // then we can get from weather function once getcity resolves
//   // response stored in weather is weather object
//   const weather = await getWeather(cityDets.Key);

//   // return object to updatecity
//   return {
//     // old way:
//     // cityDets: cityDets,
//     // weather: weather,
//     // enchanced object mdoern way:
//     cityDets,
//     weather,
//   };
// };

// function responsible for taking in some data dn outputting to browser
// data it takes will be data returned in updatecity
const updateUI = function (data) {
  // const cityDets = data.cityDets;
  // const weather = data.weather;
  // destructuring:
  const { cityDets, weather } = data;

  // update details template
  // we'll output new template to overwrite current templte containing city name, conditions, temp
  details.innerHTML = `
    <h5 class="my-18 city uppercase">${cityDets.EnglishName}</h5>
    <div class="my-18 conditions uppercase">${weather.WeatherText}</div>
    <div class="display">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

  // update night/day and icon images
  // update icon
  const iconSrc = `imgs/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  // this let will ultimately be the souce of the image we want to use
  let timeSrc = null;
  // check if daytime proeprty on weather object; ternary operator
  timeSrc = weather.IsDayTime ? "imgs/day.svg" : "imgs/night.svg";
  // update img
  time.setAttribute("src", `${timeSrc}`);
  // remove the none class to display card
  if (card.classList.contains("none")) card.classList.remove("none");
};

// attach submit event w eventlistener to form
cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  // get city value; city name inut field on input inside form
  const city = cityForm.city.value.trim();
  // reset values once we get the value they searched for. to clear form input
  cityForm.reset();

  // update UI w/ new city
  // externalize getting of data w separate fucntion
  // asynf function returns promise so we can tack on then to resolve
  // callback of resolve will take in whats returned in above return statement as data
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // set city in localstorage; save it, every time a user enters a new location, the most recent one will be stored in localstorage since we will be overwriting city key each time. so it will remmeber the last city seacrehd
  localStorage.setItem("city", city);
});

// in root of document we'll check if there was a last saved city search in llocalstorage and immedaitely send that request whenever the page refreshes or the use rhas been gone inactive  awhile
// will return a string if exists and a string of any length is truth, if it doesnt exist it will return null
if (localStorage.getItem("city")) {
  // call update city method if theres a preveious city in localstorage
  // tack on .then since this returns a promise
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
