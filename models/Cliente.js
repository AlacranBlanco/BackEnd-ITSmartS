const { Schema,  model } = require("mongoose");

const ClienteSchema = Schema({
    name: {
        type: String,
        require: true
    },
    mName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    creation: {
        type: String
    },
    lat: {
        type: Number,
        require: true
    },
    lng: {
        type: Number,
        require: true
    },
    viewportX: {
        type: Number,
        require: true
    },
    viewportY: {
        type: Number,
        require: true
    }

})

module.exports = model('Cliente', ClienteSchema);