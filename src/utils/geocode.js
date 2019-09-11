const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiamltbXlsdSIsImEiOiJjazA0cGpjcnEwMmYwM2hxeGRhdGl3MnR0In0.mUBz6PzDfUTWs8KSlFEvWw'
    
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location server...', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location...', undefined)
        }
        else {
            callback(undefined, {
                geocode: response.body.features[0].center,
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode