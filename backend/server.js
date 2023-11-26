const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 8000



app.get("/",(req,res)=>{
    res.json({
        msg : "welcome to support desk"
    })
})


app.use("/api/user",require("./routes/userRoutes"))

app.listen(PORT,()=>{
    console.log("server is happy at PORT :",PORT)
})