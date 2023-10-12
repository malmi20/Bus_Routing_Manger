const mongoose = require('mongoose')
const Schema = mongoose.Schema

const busesShema = new Schema ({
    busid: {
        type: String,
        required: true
    },

    route: {
        type: String,
        required: true
    },

    driverid: {
        type: String,
        required: true
    },

    driverName: {
        type: String,
        required: true
    }
}, {timestamps: true })

module.exports = mongoose.model('buses', busesShema)
