const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

connectDB()

app.use(cors({origin:true,credentials: true}));

app.use(express.json({ extended: false }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/booking', require('./routes/booking'))
app.use('/api/messages', require('./routes/messages'))
app.use('/api/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})