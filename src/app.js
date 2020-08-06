const path = require("path")
const express = require("express");
const hbs = require('hbs');

const mapBox = require('../src/utils/mapbox');
const openWeather = require('../src/utils/openweather');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','hbs');

const staticDirectory = path.join(__dirname, "../", "/public");
const viewDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

app.use(express.static(staticDirectory));
app.set('views', viewDirectory);
hbs.registerPartials(partialsDirectory);

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Shubham"
    }) 
});

app.get("/weather", (req,res) => {
    if (!req.query.city) {
            return res.send({
            error:"Pl specify the city and the country code"
        });
    };
    mapBox(req.query.city, req.query.code, (error, data) => {
        if (error) {
            res.send({
                name: error
            })
        } else {
            openWeather(error, data, (error, temperature) => {
                res.send({
                    temp: temperature,
                    location: req.query.city
                })
            })
        }
        
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Shubham"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"help",
        name:"Shubham",
        helpMssg: "This is the help page"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        error: 'Help page not found!',
        name: 'Shubham'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        error: 'Page not found!',
        name: 'Shubham'
    })
})

app.listen(port, () => {
    console.log("The server is running on port " + port)
})