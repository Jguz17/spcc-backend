const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const Message = require('../models/Message')

router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find()
        res.json(messages)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

router.post('/', auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('userMessage', 'Message is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name, email, phone, userMessage } = req.body

    try {
        let message = new Message({
            name,
            email,
            phone,
            userMessage
        })

        message = await message.save()

        res.json(message)
    } catch (error) {
        console.error(error.message)
        res.send("Server error")
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        let message = await Message.findById(req.params.id)

        if (!message) return res.status(400).json({ message: "Booking not found" }) 

        await Message.findByIdAndDelete(req.params.id)

        res.json({ message: 'Message deleted' })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})
module.exports = router