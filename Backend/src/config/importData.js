const fs = require('fs')
const path = require('path')
const { FrontendQuiz, BackendQuiz } = require('../Models/quiz');
const connectDB = require('./config')

require('dotenv').config()

const importData = async () => {
    try {
        await connectDB()
        
        // Clear existing data
        await FrontendQuiz.deleteMany({})
        await BackendQuiz.deleteMany({})
        
        // storing path
        const frontendjsonPath = fs.readFileSync(path.join(__dirname, './FrontendQues.json'), 'utf-8')
        const backendjsonPath = fs.readFileSync(path.join(__dirname, './BackendQues.json'), 'utf-8')

        // Parsing JSON data
        const backendData = JSON.parse(backendjsonPath)
        const frontendData = JSON.parse(frontendjsonPath)

        // Inserting data into DB - using the questions array from the parsed data
        const frontendResult = await FrontendQuiz.insertMany(frontendData.questions)
        const backendResult = await BackendQuiz.insertMany(backendData.questions)

        console.log(`Data Imported Successfully:`)
        console.log(`Frontend Questions: ${frontendResult.length}`)
        console.log(`Backend Questions: ${backendResult.length}`)
        process.exit(0)

    } catch (error) {
        console.error('Error importing data:', error.message)
        process.exit(1)
    }
}

importData()