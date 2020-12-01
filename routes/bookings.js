const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const Booking = require('../models/Booking')

router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find()
        res.json(bookings)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('bookingDate', 'Booking date is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name, email, phone, address, bookingDate, message } = req.body

    try {
        const newBookimg = new Booking({
            name,
            email,
            phone,
            address,
            bookingDate,
            message
        })

        const booking = await newBookimg.save()

        res.json(booking)
    } catch (error) {
        console.error(error.message)
        res.send("Server error")
    }
})

router.put('/:id', auth, async (req, res) => {

    const { confirmed } = req.body

    const bookingFields = {}

    if (confirmed) bookingFields.confirmed = confirmed

    try {
        let booking = await Booking.findById(req.params.id)

        if (!booking) return res.status(400).json({ message: "Booking not found" })

        booking = await Booking.findByIdAndUpdate(req.params.id, {
            $set: bookingFields,
            new: true
        })

        res.json(booking)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        let booking = await Booking.findById(req.params.id)

        if (!booking) return res.status(400).json({ message: "Booking not found" }) 

        await Booking.findByIdAndRemove(req.params.id)

        res.json({ message: 'Contact removed' })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

module.exports = router