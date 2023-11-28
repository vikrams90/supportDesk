const mongoose = require("mongoose")


// initializing database connection
const connectDB = async()=>{
   try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("MONGODB is happy at :", conn.connection.port)
   } catch (error) {
    console.log("Error : ", error.message)
   }
}

module.exports = connectDB