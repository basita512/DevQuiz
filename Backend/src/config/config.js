const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB')
        
    } catch (error) {
        console.log('Unable to connect Mongo DB', error)
    }
}

module.exports = connectDB