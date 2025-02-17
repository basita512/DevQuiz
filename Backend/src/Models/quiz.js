const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },

    question : {
        type : String,
        required : true,
    },

    options : {
        type : [String],
        required : true,
    },

    correctAnswer : {
        type : String,
        required : true
    },

    explanation : {
        type : String,
        required : true
    }
})

const FrontendQuiz = mongoose.model('FrontendQuiz', quizSchema)
const BackendQuiz = mongoose.model('BackendQuiz', quizSchema)
module.exports = {FrontendQuiz, BackendQuiz}
