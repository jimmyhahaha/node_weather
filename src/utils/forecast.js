const request = require('request')

const forecast = (lati, long, callback) => {
    const url = 'https://api.darksky.net/forecast/f61e41ba5764bd01ae5ce0f148c892c0/' + lati + ',' + long

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather server...', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find weather with given location...', undefined)
        }
        else {
            callback(undefined, {
                sky: response.body.currently.summary,
                temp: response.body.currently.temperature
            })
        }
    })
}

module.exports = forecast