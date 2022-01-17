import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import { generateWeatherEntry } from './js/app'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/style.scss'

console.log(checkForName);
//alert("I EXIST")

/* Global Variables */

// Event listener to add function to existing HTML DOM element
const generateBtn = document.getElementById("generate");

generateBtn.addEventListener('click', function respondToTheClick(evt) {
    console.log('Generate Button Pressed.');
    generateWeatherEntry();
});

export {
    checkForName,
    handleSubmit,
    generateWeatherEntry
}
