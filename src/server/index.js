var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()

const fetch = require('node-fetch');

// Setup empty JS object to act as endpoint for all routes
projectData = {};
let weatherForecast = {};
let geoData = {};

// Personal API Key for OpenWeatherMap API
const openWeatherMapApiKey = "038b64cf664b8b224d0cdd7c44a06dae";

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

//Routes
app.get('/getProjectData', (request, response)=> {
    console.log("getProjectData called");
    response.send(projectData);
});

app.post('/postWeatherStatus', postWeatherStatus );
function postWeatherStatus (req, res){
    console.log(req.body);
    Object.assign(projectData, req.body);
 }

app.post('/getWeatherTemp', getGeonames);

app.route('/getForcast')   

    .get(async function(req, res){
        //getGeonames(req)
        const geo = await getGeonames(req)
        res.send(weatherForecast);
    })


async function getGeonames(req) {

    //    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geoData.latitude}&lon=${geoData.longitude}&days=16&units=M&key=${weather_key}`

    const response = await 
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip}&units=imperial&appid=${openWeatherMapApiKey}`);
  
    try {
        const newData = await response.json();
        console.log(newData);
        

        if(typeof newData.main == "undefined"){
          //return "City not found";
          //res.send("City not found")
          Object.assign(weatherForecast, "City not found");

        } else {
          //return newData.main;
          //res.send(newData.main.temp)
          //res.status(200).send((newData.main).toString());
          //res.json(newData);
          //res.response(newData);
          Object.assign(weatherForecast, newData.main);

        }
    } catch (error) {
        console.log("error", error);
    }
  };

  /* Function to POST data */
  const postData = async (url = "", data = {}) => {
      console.log(data);
      const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
  
      try {
          const newData = await response.json();
          console.log(newData);
  
          return newData;
      } catch (error) {
          console.log("error", error);
      }
  };
  
  /* Function to GET Project Data */
  const getProjectData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        credentials: "same-origin", // include, *same-origin, omit
        headers: {  "Content-Type": "application/json" }
    });
  
    try {
        const projectDataList = await response.json();
        console.log(projectDataList);
  
        let data = projectDataList;
        let date = data.date;
        let tempature = data.tempature;
        let feelings = data.feelings;
  
        //Check for NULL or empty strings
        if(date){
          document.getElementById("date").innerHTML = date;
        } else {
          document.getElementById("date").innerHTML = null;
        }
        if(tempature){
          document.getElementById("temp").innerHTML = tempature;
        } else {
          document.getElementById("temp").innerHTML = null;
        }
        if(feelings){
          document.getElementById("content").innerHTML = feelings;
        } else {
          document.getElementById("content").innerHTML = null;
        }
  
    } catch (error) {
        console.log("error", error);
    }
  };

module.exports = getProjectData, postData, getGeonames;

  // app.post('/aylienNewsApiCall', function (req, res) {
    
//     var opts = {
//         title: req.body.url,
//         publishedAtStart: "NOW-7DAYS",
//         publishedAtEnd: "NOW"
//       };

//     api.listStories(opts, 
//         function(error, response) {
//             if (error) {
//                 console.error(error);
//             } else {
//                 res.send(response);
//             }
//         }
//     );
// })

// app.post('/meaningCloudApiCall', getSentimentAnalysis)

// async function getSentimentAnalysis(req, res) {

//     const urlToAPI = "https://api.meaningcloud.com/sentiment-2.1?key=" + process.env.API_KEY + "&url=" + req.body.title + "&lang=en";

//         const response = await fetch(urlToAPI);
//         try {
//             const sentiment = await response.json();
//              console.log("sentiment: ", sentiment);
//              res.send(sentiment)

//         } catch (error) {
//             console.log("error", error)
//         }
//     }
