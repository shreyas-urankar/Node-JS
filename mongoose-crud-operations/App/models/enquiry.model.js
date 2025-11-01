let mongoose = require('mongoose')

let userEnquireSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String, 
        unique:true
    }
})

let enquireModel = mongoose.model("enquire", userEnquireSchema)
module.exports = enquireModel
