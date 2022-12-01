require("dotenv").config() // load env variables
const express = require("express") // bring in express to make our app
const morgan = require("morgan") // logger for our reqyest
const methodOverride = require("method-override") // allows us to override post request from our ejs/forms
const mongoose = require("mongoose") // gives us that db connection and cool methids for CRUD to the datas
const Fruit = require('./models/fruits.js')
const fruitController = require('./controllers/fruits.js')
const PORT = process.env.PORT
const app = express()

// DATABASE CONNECTIONS

// const DATABASE_URL = process.env.DATABASE_URL
// const CONFIG = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

// // ESTABLISH OUR CONNECTION
// mongoose.connect(DATABASE_URL, CONFIG)



/////// MIDDLEWARE
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(fruitController)



// LOG CONNECTIONS EVENTS FROM MONGOOSE
// mongoose.connection
// .on("open", ()=> console.log("Mongoose connected"))
// .on("close", ()=> console.log(`Disconnected from Mongoose`))
// .on("error", (error) => console.log("Mongoose Error", error))

app.listen(PORT, () => console.log(`You're on port ${PORT}`))