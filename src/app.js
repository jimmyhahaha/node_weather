const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config.
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App...',
        name: 'ABC'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About meee',
        name: 'ABC'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help pageee',
        text: '@#$%^&*()+',
        name: 'ABC'
    })
})

// Weather route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }
    console.log(req.query)
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                message: error
            })
        }
        forecast(data.geocode[1], data.geocode[0], (error, forecastData) => {
            if (error) {
                return res.send({
                    message: error
                })
            }
            res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.address
            })
        }) 
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404...',
        text: 'Help info not found...',
        name: 'ABC'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404...',
        text: 'Page not found',
        name: 'ABC'
    })
})





app.listen(3000, () => {
    console.log('Server is up on port 3000')
})