const User = require('../Models/user')

//---------------------------------When user enter details to Start Quiz---------------------------------

const startQuiz = async (req, res) => {
    try {
        const { name, category } = req.body
        
        //Existing user check
        const existingUser = await User.findOne({
            name : name
        })
        if (existingUser) {
            return res.status(409).json({
                success : false,
                message : 'User belonging to this username already exists. Please try different username'
            })
        }

        //If new user
        const user = await User.create({
            name : name,
            selectedCategory : category
        })
        const userId = user._id
        console.log(userId)
        res.status(200).json({      
            success : true,
            userId : userId.toString()
        })

    } catch (error) {
        console.error('login error:', error)
        res.status(500).json({
            success : false,
            message : 'Internal server error',
            error : error.message,
        })
    }
}



//---------------------------------When user's final score is submitted---------------------------------

const submitScore = async (req, res) => {
    try {
        const { userId, score } = req.body
        await User.findByIdAndUpdate(userId, { score })
        res.json({
            message : 'Score sumbitted!'
        })
    } catch (error) {
        res.status(500).json({
            message : 'Server error'
        })
    }
}

module.exports = {
    startQuiz, submitScore
}