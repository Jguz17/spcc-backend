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

module.exports = router