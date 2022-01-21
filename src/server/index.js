var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

app.use(cors())
app.use(bodyParser.json())

// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

let geoNamesData = {}
let pixabayData = {}
let weatherBitForcastData = {}

app.post('/getGeoNamesData', getGeoNamesData2);
app.post('/getPixabayData', getPixabayData2);
app.post('/getWeatherbitForecastData', getWeatherbitForecastData2);

async function getGeoNamesData2(req, res) {
  const url = `http://api.geonames.org/searchJSON?q=${req.body.destination}&maxRows=1&username=${process.env.GEO_API_KEY}`
  //console.log('url ', url);

      const response = await fetch(url);
      try {
          const data = await response.json();
          console.log(data);

          geoNamesData.lat = data.geonames[0].lat;
          geoNamesData.lng = data.geonames[0].lng;
          geoNamesData.countryName = data.geonames[0].countryName;
          geoNamesData.city = data.geonames[0].toponymName;

          res.send(geoNamesData) 
      } catch (error) {
          console.log("error", error)
      }
}

async function getPixabayData2 (req, res) {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.body.city}&category=places&image_type=photo`

  const response = await fetch(url)
  try {
      const data = await response.json();
      console.log(data);

      if (data.totalHits >= 1) {
        pixabayData.picture = data.hits[0].largeImageURL
      } else {
        pixabayData.picture = ""
      }

      res.send(pixabayData) 

  }catch(error) {
      console.log(error)
  }
}

async function getWeatherbitForecastData2(req, res) {

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.body.lat}&lon=${req.body.lng}&units=I&key=${process.env.WEATHERBIT_API_KEY}`

  //NOTE Historical data is behind a paywall, cannot retrieve this
  //const url = `https://api.weatherbit.io/v2.0/history/daily?&lat=${projectData.lat}&lon=${projectData.lng}&start_date=${projectData.departure}&end_date=${projectData.departure}&key=${process.env.WEATHERBIT_API_KEY}`

  console.log("url", url);

  const response = await fetch(url)
  try {
      const weatherbitForecastData = await response.json();
      weatherBitForcastData.max_temp =weatherbitForecastData.data[0].max_temp
      weatherBitForcastData.min_temp = weatherbitForecastData.data[0].min_temp
      weatherBitForcastData.description = weatherbitForecastData.data[0].weather.description
      weatherBitForcastData.icon = weatherbitForecastData.data[0].weather.icon
      res.send(weatherBitForcastData) 
  } catch (error) {
      console.log(error)
  }
}

function getProjectData(){
  return getGeoNamesData
}

module.exports =  getProjectData;
