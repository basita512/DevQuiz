const mongoose = require('mongoose')
require("dotenv").config({ path: `${__dirname}/../../.env` })


const connectDB = async () => {
    try {
        const DB_URL = process.env.MONGO_URL
        console.log('This is MongDB url',DB_URL)
        
        if (!DB_URL) {
            throw new Error('MONGO_URL is not defined in .env file!')
        }

        await mongoose.connect(DB_URL)
        console.log('Connected to MongoDB')
        
    } catch (error) {
        console.log('Unable to connect Mongo DB', error)
    }
}

module.exports = connectDB