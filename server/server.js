const express = require('express')
const cors = require('cors') 
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true, 
    origin:"http://localhost:5173"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('dotenv').config()
require('./config/mongoose.config')
require('./routes/user.routes')(app)
require('./routes/design.routes')(app)
require('./routes/challenge.routes')(app)

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})