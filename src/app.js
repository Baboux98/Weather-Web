const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");

const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Farhane",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Farhane",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "If you need help don 't try to reach for me",
    name: "Farhane",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address !",
    });
  }
  //console.log(req.query.address);
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

/* app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
}); */

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Farhane",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Farhane",
    errorMessage: "Page not found",
  });
});

/* app.get('', (req, res) => {
res.send('Hello Express!');
});
  
app.get('/help', (req, res) => {
res.send('this the help page')
res.send([
  { name: 'Farhane', age: 100 },
  {
    name: 'Andrew',
    age: 27,
  },
]);
});
    
app.get('/about', (req, res) => {
res.send('<h1>About</h1>');
});*/

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
