const fs = require('fs')
const path = require('path')
const FrontendQuiz = require('../Models/quiz')
const BackendQuiz = require('../Models/quiz')
const connectDB = require('./config')

require('dotenv').config()

const importData = async () => {
    try {
        await connectDB()
        
        // storing path
        const frontendjsonPath = fs.readFileSync(path.join(__dirname, './FrontendQues.json'), 'utf-8')
        const backendjsonPath = fs.readFileSync(path.join(__dirname, './BackendQues.json'), 'utf-8')

        // Parsing JSON data
        const backendData = JSON.parse(backendjsonPath)
        const frontendData = JSON.parse(frontendjsonPath)

        // Inserting data into DB
        await FrontendQuiz.inserMany(frontendData)
        await BackendQuiz.inserMany(backendData)

        console.log('Data Imported Successfully')
        process.exit(1)

    } catch (error) {
        console.error('Error importing data', error)
        process.exit(1)
    }
}

// importData()