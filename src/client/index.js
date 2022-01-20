import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import { saveTripData, removeTrip } from './js/app'
import defaultImage from "./media/defaultPicture.png";

import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/style.scss'

let image = document.getElementById("travelPicture");
image.src = defaultImage

document.getElementById("removeTrip").disabled = true; 
document.getElementById("tripDetailsWrapper").style.visibility = "hidden"; 

const saveTripBtn = document.getElementById("saveTrip");
saveTripBtn.addEventListener('click', function respondToTheClick(evt) {
    console.log('Save Trip Button Pressed.');
    saveTripData();
});

const removeTrpBtn = document.getElementById("removeTrip");
removeTrpBtn.addEventListener('click', function respondToTheClick(evt) {
    console.log('Remove Trip Button Pressed.');
    //Re-set the image
    image.src = defaultImage
    removeTrip();
});

export {
    checkForName,
    handleSubmit,
    saveTripData
}