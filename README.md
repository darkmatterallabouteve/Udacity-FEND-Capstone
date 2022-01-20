# Udacity-FEND-Capstone

<img src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif">

The goal of this repo is be an example of a basic but functional app built on Express and Webpack. This is a trip planner, to determine save a destination, departure date and local weather of that destination.

# Usage
On Submit main search form will make a API call to three separate APIS.  

- Geonames - Used to retrieve the location details (longitute, latitude, country name, etc) of the location
- Weatherbit - Used to retrieve the local weather of the location based on longitude and latitude
- Pixabay - Used to retrieve an image of location for display

Validation on the form will make sure there no empty values are submitted.

## Included in this project

- Webpack entry point
- Webpack output and dist folder
- Webpack Loaders
- Webpack Plugins
- Webpack Mode
- Tools for convenient Webpack development

# Extend Options / Ways to Stand Out

- Incorporate icons into forecast.
- Allow the user to remove the trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities). 