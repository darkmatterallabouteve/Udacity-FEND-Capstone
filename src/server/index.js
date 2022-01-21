var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

let projectData = {destination:'', departure:'', lat:'', lng:'', countryName:'', city:'', picture:'', max_temp:'', min_temp:'', description:'', icon:''}

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

app.post('/saveTripData', saveTripData);

async function saveTripData(req, res) {
    
    console.log(req.body);
    
    //Empty projectData
    Object.keys(projectData).forEach(key => {
      projectData[key] = '';
    });

    projectData.destination = req.body.destination;
    projectData.departure = req.body.departure;

    getGeoNamesData().then ( () => {
        getPixabayData().then ( () => {
          getWeatherbitForecastData().then ( () => {
              console.log("after all", projectData);
              res.send(projectData) 
        })
      })
    })
}

async function getGeoNamesData() {
  const url = `http://api.geonames.org/searchJSON?q=${projectData.destination}&maxRows=1&username=${process.env.GEO_API_KEY}`
  //console.log('url ', url);

      const response = await fetch(url);
      try {
          const geoNamesData = await response.json();
          console.log(geoNamesData);

          projectData.lat = geoNamesData.geonames[0].lat;
          projectData.lng = geoNamesData.geonames[0].lng;
          projectData.countryName = geoNamesData.geonames[0].countryName;
          projectData.city = geoNamesData.geonames[0].toponymName;

          return projectData
      } catch (error) {
          console.log("error", error)
      }
}

async function getPixabayData () {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${projectData.city}&category=places&image_type=photo`

  const response = await fetch(url)
  try {
      const data = await response.json();
      if (data.totalHits >= 1) {
          projectData.picture = data.hits[0].largeImageURL
      } else {
        projectData.picture = ""
      }
  }catch(error) {
      console.log(error)
  }
}

async function getWeatherbitForecastData() {

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${projectData.lat}&lon=${projectData.lng}&units=I&key=${process.env.WEATHERBIT_API_KEY}`

    //Caculate weather on a future date
    let departureDate = new Date(projectData.departure);
    let currentDate = new Date();
    var time_difference = departureDate.getTime() - currentDate.getTime();  
    var days_difference = time_difference / (1000 * 60 * 60 * 24);  
    days_difference = (Math.round(days_difference * 10)/10).toFixed(0);
   
  //NOTE Historical data is behind a paywall, cannot retrieve this
  //const url = `https://api.weatherbit.io/v2.0/history/daily?&lat=${projectData.lat}&lon=${projectData.lng}&start_date=${projectData.departure}&end_date=${projectData.departure}&key=${process.env.WEATHERBIT_API_KEY}`

  console.log("url", url);

  const response = await fetch(url)
  try {
      const weatherbitForecastData = await response.json();
      projectData.max_temp =weatherbitForecastData.data[0].max_temp
      projectData.min_temp = weatherbitForecastData.data[0].min_temp
      projectData.description = weatherbitForecastData.data[0].weather.description
      projectData.icon = weatherbitForecastData.data[0].weather.icon

  } catch (error) {
      console.log(error)
  }
}

function getImages(){
  console.log("testing")
}

module.exports = getGeoNamesData, getImages;
