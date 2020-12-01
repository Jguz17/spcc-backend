const mongoose = require('mongoose')

const BookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    confirmed: {
        type: String,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Booking', BookingSchema)