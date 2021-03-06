console.log('Testing...')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message3 = document.querySelector('#message3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    
    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.message) {
                message1.textContent = data.message
            }
            else {
                message1.textContent = data.location
                message2.textContent = "Current temp is " + data.forecast.temp + " Fahrenheit. Current sky is " + data.forecast.sky
                message3.textContent = data.forecast.dailySummary
            }
        })
    })
})
