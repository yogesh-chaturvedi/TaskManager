const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const AuthRouters = require('./routes/AuthRoutes')
const UserRouters = require('./routes/UserRoute')
const TaskRouters = require('./routes/TasksRoutes')


app.use(cookieParser())
app.use(cors({
    origin:process.env.ORIGIN ,
    credentials: true,
}))


app.use(bodyParser.json())
const port = 3000 || process.env.PORT


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use('/auth', AuthRouters)
app.use('/users', UserRouters)
app.use('/task', TaskRouters)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})