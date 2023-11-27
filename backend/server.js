const express = require("express")
const errorHandler = require("./middleware/errorMiddleware")
const connectDB = require("./DB/db_config")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended : true}))


connectDB()


app.get("/",(req,res)=>{
    res.json({
        msg : "welcome to support desk"
    })
})

app.use("/api/user",require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("server is happy at PORT :",PORT)
})