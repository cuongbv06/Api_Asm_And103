const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
    userName: {type: String, unique: true, maxLength: 255},
    password: {type: String, maxLength: 255},
    email: {type: String},
    name: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('user', Users)