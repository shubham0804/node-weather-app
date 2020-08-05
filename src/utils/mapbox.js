const request = require("request");
const https = require("https");

const openWeather = require('../utils/openweather')

const mapBox = (city, countryCode, geocode) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?&country=${countryCode}&access_token=pk.eyJ1Ijoic2h1YmhhbTA4MDQiLCJhIjoiY2tkNW9qY21kMGo0NDJ5bnp4Z3lpMHNxeCJ9.dWMFPXZneiAI4-DU3RBQ6Q`;
    request({url, json:true}, (error, {body}) => {
        if (!body.features) {
            geocode("Unable to find location", undefined)
        }
        else {
            const data = {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0]
            };
            geocode(error, data)
        }
        
    })
}

// mapBox("indore", "IN", (error, data) => console.log(data))
// mapBox('delhi', 'IN')

module.exports = mapBox;