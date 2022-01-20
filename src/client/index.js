import { saveTripData, removeTrip } from './js/app'
import defaultImage from "./media/defaultPicture.png";

import './styles/resets.scss'
import './styles/form.scss'
import './styles/style.scss'

let image = document.getElementById("travelPicture");
image.src = defaultImage

document.getElementById("removeTrip").disabled = true; 
document.getElementById("tripDetailsWrapper").style.visibility = "hidden"; 

const saveTripBtn = document.getElementById("saveTrip");
saveTripBtn.addEventListener('click', function respondToTheClick(evt) {
    //Validate and Save the trip data
    saveTripData();
});

const removeTrpBtn = document.getElementById("removeTrip");
removeTrpBtn.addEventListener('click', function respondToTheClick(evt) {
    //Re-set the travel image to default
    image.src = defaultImage
    removeTrip();
});