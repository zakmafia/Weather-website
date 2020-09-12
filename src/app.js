const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000

// defining path for the express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setting to use static folder
app.use(express.static(publicDirectoryPath))

// seting the view engine to use hbs and allocating the views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zekarias Mesfin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zekarias Mesfin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        info: 'This is the place to find any help!',
        name:'Zekarias Mesfin'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'you must provide a search address!'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude,(error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Zekarias Mesfin'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'My 404 Page!',
        name: 'Zekarias Mesfin'
    })
})

app.listen(port, () => {
    console.log('Sever is fired up at port ' + port)
})