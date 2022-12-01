require("dotenv").config() // load env variables
const mongoose = require("mongoose") // gives us that db connection and cool methods for CRUD to the datas

// DATABASE CONNECTIONS

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// ESTABLISH OUR CONNECTION
mongoose.connect(DATABASE_URL, CONFIG)

// LOG CONNECTIONS EVENTS FROM MONGOOSE
mongoose.connection
.on("open", ()=> console.log("Mongoose connected"))
.on("close", ()=> console.log(`Disconnected from Mongoose`))
.on("error", (error) => console.log("Mongoose Error", error))

// export mongoose with connection to use in other files
module.exports = mongoose