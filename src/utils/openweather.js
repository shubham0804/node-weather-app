const request = require("request");
const https = require("https");
const express = require('express')

// const req = https.request(`https://api.openweathermap.org/data/2.5/weather?lat=42.36&lon=-71.059&units=metric&appid=5ca4f081f4fc11062c5956229de74e75`, (res) => {
//     let data = ""

//     res.on('data', (d) => {
//         data = data + d.toString();
//         data = JSON.parse(data)
//     })

//     res.on('end', () => {
//         console.log(data.main.temp)
//     });
// })

// req.end()



const openWeather = (error, {lat,lon} = {}, response) => {
    if (error) {
        console.log(error)
    }
    else {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5ca4f081f4fc11062c5956229de74e75`
            request({url, json: true}, (error, {body}) => {
        
            response(undefined, body.main.temp);
    });
    }
    
}

module.exports = openWeather;