const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Fruits = new Schema({
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    image:{type: Array},
    id_distributor: {type: Schema.Types.ObjectId, ref: 'distributor'},
},{
    timestamps: true
})

module.exports = mongoose.model('fruit', Fruits)