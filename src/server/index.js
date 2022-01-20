var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

app.use(cors())

// to use json
app.use(bodyParser.json())

// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

projectData = {destination:'', departure:'', lat:'', lng:'', countryName:'', city:'', countryCode:'', picture:'', date:'', max_temp:'', min_temp:'', description:'', icon:'', code:''}

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
          projectData.countryCode =  geoNamesData.geonames[0].countryCode;

      } catch (error) {
          console.log("error", error)
      }
}

//TODO re-write this method
async function getPixabayData () {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${projectData.city}&category=places&image_type=photo`
  //console.log("url", url);

  const response = await fetch(url)
  try {
      const data = await response.json();

      if (data.totalHits >= 1) {
          projectData.picture = data.hits[0].largeImageURL
      } else if (data.totalHits === 0)  {

          const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${projectData.countryName}&category=places&image_type=photo`
          const response = await fetch(url)
          try{
              const data = await response.json();
              if (data.totalHits === 0) {
                  projectData.picture = ""
              } else {
                  projectData.picture = data.hits[0].largeImageURL
              }
          }catch(error) {
              console.log(error)
          }
      }
  }catch(error) {
      console.log(error)
  }
}

async function getWeatherbitForecastData() {

  //Caculate weather on a future date
   let departureDate = new Date(projectData.departure);
   let currentDate = new Date();
   var time_difference = departureDate.getTime() - currentDate.getTime();  
   var days_difference = time_difference / (1000 * 60 * 60 * 24);  
   days_difference = (Math.round(days_difference * 10)/10).toFixed(0);
  console.log("days_difference=", days_difference);

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${projectData.lat}&lon=${projectData.lng}&days=${days_difference}&units=I&key=${process.env.WEATHERBIT_API_KEY}`

  //NOTE Historical data is behind a paywall, cannot retrieve this
  //const url = `https://api.weatherbit.io/v2.0/history/daily?&lat=${projectData.lat}&lon=${projectData.lng}&start_date=${projectData.departure}&end_date=${projectData.departure}&key=${process.env.WEATHERBIT_API_KEY}`

  console.log("url", url);

  const response = await fetch(url)
  try {
      const weatherbitForecastData = await response.json();
      projectData.date = weatherbitForecastData.data[0].valid_date
      projectData.max_temp =weatherbitForecastData.data[0].max_temp
      projectData.min_temp = weatherbitForecastData.data[0].min_temp
      projectData.description = weatherbitForecastData.data[0].weather.description
      projectData.icon = weatherbitForecastData.data[0].weather.icon
      projectData.code = weatherbitForecastData.data[0].weather.code

  } catch (error) {
      console.log(error)
  }
}