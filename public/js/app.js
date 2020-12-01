// console.log("this is a test")
// console.log('Client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// });

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const getForecast = (location) => {
  fetch(
    "http://localhost:3000/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        //return console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        //   console.log(data.forecast);
        //   console.log(data.location);
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
    });
  });
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchElement.value;

  messageOne.textContent = " Loading ...";
  messageTwo.textContent = " ";

  getForecast(location);
  //console.log(getForecast(location));
});
