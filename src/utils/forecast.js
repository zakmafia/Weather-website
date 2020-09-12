const request = require('request')

const forecast = (long, lat, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?&appid=1406f7843fe56e0782f7b4be49fecd39&units=metric&lat=${lat}&lon=${long}`

    request({url: url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined,  `It is currently ${body.main.temp}*C degrees out with a high temprature of ${body.main.temp_max}*C and with a low temprature of ${body.main.temp_min}*C. There is a ${body.main.humidity + '%'} chance of rain.`)
        }
    })
}

module.exports = forecast

