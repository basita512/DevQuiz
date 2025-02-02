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
    },

    score : {
        type : Number,
        default : 0
    },

    completed : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User