const mongoose = require('mongoose')

var logSchema = new mongoose.Schema({
    patientid: {type: Number },
    patientname: {type: String },
    age: {type: Number },
    bloodgroup: {type: String },
    address: {type: String },
    contact: {type: Number },
    issue: {type: String },
    status: {type : String}
})

const ekart = mongoose.model('hospital', logSchema)
module.exports = ekart