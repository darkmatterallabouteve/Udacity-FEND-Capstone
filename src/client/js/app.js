// // Personal API Key for OpenWeatherMap API
// const openWeatherMapApiKey = "038b64cf664b8b224d0cdd7c44a06dae";

/* Function called by event listener */
function generateWeatherEntry() {

  let feelings = document.getElementById("feelings").value;
  let zip = document.getElementById("zip").value;
  
  // Create a new date and format into a string to be stored
  let today = new Date();
  var strDate = 'Y-m-d'
    .replace('Y', today.getFullYear())
    .replace('m', today.getMonth()+1)
    .replace('d', today.getDate());

  // getWeatherTemp(zip)
  //   .then(temp => {
  //     console.log(temp);

  //     //Post weather status to server
  //     postData("/postWeatherStatus", { date: strDate, tempature: temp, zipCode: zip, feelings: feelings });
  //   })
  //   .then(data => {
  //      //Retrieve saved projectdata and dynamically display on page
  //      getProjectData("/getProjectData");
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });   
    
    
    fetch('http://localhost:8081/getForecast', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zip:zip })
    }).then(response => {
      console.log(response);
      console.log("here");
      //Post weather status to server
      //postData("/postWeatherStatus", { date: strDate, tempature: temp, zipCode: zip, feelings: feelings });
    })
    .then(data => {
      //Retrieve saved projectdata and dynamically display on page
      //getProjectData("/getProjectData");
    })
    .catch((error) => {
      console.error('Error:', error);
    });  

}

// /* Function to GET Web API Data*/
// const getWeatherTemp = async (zip) => {
//   const response = await 
//     fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${openWeatherMapApiKey}`);

//   try {
//       const newData = await response.json();
//       console.log(newData);

//       if(typeof newData.main == "undefined"){
//         return "City not found";
//       } else {
//         return newData.main.temp;
//       }
//   } catch (error) {
//       console.log("error", error);
//   }
// };

// /* Function to POST data */
// const postData = async (url = "", data = {}) => {
//     console.log(data);
//     const response = await fetch(url, {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });

//     try {
//         const newData = await response.json();
//         console.log(newData);

//         return newData;
//     } catch (error) {
//         console.log("error", error);
//     }
// };

// /* Function to GET Project Data */
// const getProjectData = async (url = "", data = {}) => {
//   const response = await fetch(url, {
//       method: "GET", // *GET, POST, PUT, DELETE, etc.
//       credentials: "same-origin", // include, *same-origin, omit
//       headers: {  "Content-Type": "application/json" }
//   });

//   try {
//       const projectDataList = await response.json();
//       console.log(projectDataList);

//       let data = projectDataList;
//       let date = data.date;
//       let tempature = data.tempature;
//       let feelings = data.feelings;

//       //Check for NULL or empty strings
//       if(date){
//         document.getElementById("date").innerHTML = date;
//       } else {
//         document.getElementById("date").innerHTML = null;
//       }
//       if(tempature){
//         document.getElementById("temp").innerHTML = tempature;
//       } else {
//         document.getElementById("temp").innerHTML = null;
//       }
//       if(feelings){
//         document.getElementById("content").innerHTML = feelings;
//       } else {
//         document.getElementById("content").innerHTML = null;
//       }

//   } catch (error) {
//       console.log("error", error);
//   }
// };

export { generateWeatherEntry }