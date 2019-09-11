console.log('Testing...')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.message) {
                message1.textContent = data.message
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecast.temp
            }
        })
    })
})
