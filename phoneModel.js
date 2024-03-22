const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Phones = new Schema({
    image: {type: String},
    ten: {type: String, required: true},
    mau: {type: String, required: true},
    gia: {type: Number, required: true},
},{
    timestamps: true
})

const PhoneModel = new mongoose.model('phone', Phones)
module.exports = PhoneModel