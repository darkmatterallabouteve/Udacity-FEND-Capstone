//Primary Function to validate and save trip data 
function saveTripData() {
    //console.log("entering... saveTripData")

    //Validate field inputs
    validateData().then( async(data)=> {
        //console.log("saveTripData start", data)
        if(data) {
          //Process and Save trip data to server
          await postData("http://localhost:8081/saveTripData", data).then( async(tripData) => {
            //console.log("saveTripData end", tripData)
      
            //Display data on UI
            await displayOnUI(tripData)
          })
        }
    })
}

function removeTrip(){
  document.getElementById("tripDetailsWrapper").style.visibility = "hidden"; 
  document.getElementById("removeTrip").disabled = true; 
}

async function displayOnUI(tripData) {
    //console.log("tripData")

    //Clear form / enable removeTrip btn
    document.getElementById("removeTrip").disabled = false; 
    document.getElementById("destination").value = "";
    document.getElementById("departureDate").value = "";

    if(tripData.city !== null && tripData.city !== '') {
      document.getElementById("tripDetailsWrapper").style.visibility = "visible"; 

      if(tripData.picture !== null && tripData.picture !== '') {
        document.getElementById("travelPicture").src = tripData.picture;
      } 

      //calculate time difference 
      let departureDate = new Date(tripData.departure);
      let currentDate = new Date();
      var time_difference = departureDate.getTime() - currentDate.getTime();  
      var days_difference = time_difference / (1000 * 60 * 60 * 24);  
      days_difference = (Math.round(days_difference * 10)/10).toFixed(0);

      document.getElementById("weatherIcon").src = `https://www.weatherbit.io/static/img/icons/${tripData.icon}.png`;
      document.getElementById("daysAway").innerHTML = `${tripData.city}, ${tripData.countryName} is ${days_difference} days away.`;
      document.getElementById("weatherForDepartureDate").innerHTML = `Typical weather for departure date ${tripData.departure} is:`;
      document.getElementById("hiLoTemp").innerHTML = `High: ${tripData.max_temp}, Low: ${tripData.min_temp}`;
      document.getElementById("weatherDescrip").innerHTML = tripData.description;

    } else {
      document.getElementById("errorMessages").innerHTML += "Destination not found. Try again.<br/>"; 
    }

    return true;
}

async function validateData() {
    //console.log("entering... validateData")
    document.getElementById("errorMessages").innerHTML = "";

    let errorsFound = false;
    let destination = document.getElementById("destination").value;
    let departure = document.getElementById("departureDate").value;
    //console.log(departure)

    if(destination == null || destination == ''){
      document.getElementById("errorMessages").innerHTML += "Add a destination<br/>"; 
      errorsFound = true;
    }
    if(departure == null || departure == ''){
      document.getElementById("errorMessages").innerHTML += "Add a departure date<br/>"; 
      errorsFound = true;
    } else {
      //Calcualate to determine if the entered date is in the past
      var departureDate = new Date(document.getElementById("departureDate").value)
      var now = new Date();
      now.setHours(0,0,0,0);
      if (departureDate < now) {
        document.getElementById("errorMessages").innerHTML += "Departure date in the past<br/>"; 
        errorsFound = true;
      }
    }
    
    if(errorsFound) {
      return false;
    } else {
      return {destination: destination, departure: departure};
    }
}

const postData = async (url = "", data = {}) => {
    //console.log(data);
    
    const response = await fetch(url, {
        method: "POST", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const postData = await response.json();
        return postData;
    } catch (error) {
       console.log("error", error)
    }
};

export { saveTripData, removeTrip }