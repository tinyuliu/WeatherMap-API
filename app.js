//jjshint esversion6

const express = require('express');
const https = require('https');//Native node module
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const query = req.body.cityName;
    const apiKey = "4ef54d573c676a0121ba4d301eb59989";
    const unit = "metric";
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weateher is currently "+ description +"</p>");
            res.write('<h1>The temperature in '+ query +' is ' + temp + ' desgress Celcius.</h1>');
            res.write('<img src="'+ imageURL +'" />');
            res.send();

            // const object = {
            //     name: "Tiffany",
            //     favouriteFood: "Ramen"
            // }
            // console.log(JSON.stringify(object));

        });
    });
});







app.listen(3000, function() {
    console.log('Server is runnning on port 3000.');
})
