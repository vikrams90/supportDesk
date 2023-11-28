const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    description : {
        type : String,
        required : [true,"please enter a description of issue"],
    },
    status : {
        type : String,
        required : true,
        enum : ["new", "open","closed"]
    },
    product : {
        type : String,
        required : [true,"please select product"],
        enum : ["iphone","ipad","imac","macbook"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("ticket",ticketSchema)