// server.js 
// importing required modules and middlewares
// 
const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorMiddleware")
const connectDB = require("./DB/db_config")

require("dotenv").config()
const PORT = process.env.PORT || 8000

// using body-parser middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))


// initializing database connection
connectDB()

// home route for server
app.get("/",(req,res)=>{
    res.json({
        msg : "welcome to support desk"
    })
})

// using route middleware for routing user routes
app.use("/api/user",require("./routes/userRoutes"))

// using route middleware for routing bticket routes
app.use("/api/ticket",require("./routes/ticketRoutes"))

// using error handler custom middleware for error handling
app.use(errorHandler)

// initliazing server
app.listen(PORT,()=>{
    console.log("server is happy at PORT :",PORT)
})