const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected Successfully')
    })
    .catch((error) => {
        console.log('Connection Failed')
        console.error('Connection error', error)
    })