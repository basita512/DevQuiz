const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3
    },

    selectedCategory : {
        type : String,
        required : true,
        enum : ['frontend', 'backend']
    },

    score : {
        type : Number,
        default : 0
    },

    quizHistory : {
        type : [{
            questionId : Number,
            selectedAnswer : String,
            isCorrect : Boolean,
            timestamp : {
                type : Date,
                default : Date.now
            }
        }],
        default : []
    },

})

const User = mongoose.model('User', userSchema)
module.exports = User