const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouters = require('./routes/AuthRoutes')

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}))


app.use(bodyParser.json())
const port = 3000 || process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use('/auth', AuthRouters)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
