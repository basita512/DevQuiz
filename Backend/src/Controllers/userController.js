const User = require('../Models/user')
const zod = require('zod')

const userDetails = zod.object({
    name : zod.string().min(3),
    selectedCategory : zod.string()
})

const startQuiz = async (req, res) => {
    try {
        const response = userDetails.safeParse({
            name : req.body.name,
            selectedCategory : req.body.selectedCategory
        })
        if (!response.success) {
            return res.status(400).json({
                message : 'Invalid request body',
                error : response.error.message
            })
        }
        
        //Existing user check
        const existingUser = await User.findOne({
            name : req.body.name
        })
        if (existingUser) {
            return res.status(411).json({
                message : 'User belonging to this username already exists. Please try different username'
            })
        }

        //If new user
        const user = await User.create({
            name : req.body.name,
            selectedCategory : req.body.selectedCategory
        })
        const userId = user._id
        console.log(userId)
        res.status(200).json({
            userId
        })

    } catch (error) {
        console.error('login error:', error)
        res.status(500).json({
            message : 'Internal server error',
            error : error.message
        })
    }
}

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