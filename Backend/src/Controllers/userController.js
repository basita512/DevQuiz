const User = require('../Models/user')

const userDetails = zod.object({
    name : zod.string().min(3),
    category : zod.string()
})

const startQuiz = async (req, res) => {
    try {
        const response = userDetails.safeParse(req.body)
        
        //Existing user check
        const existingUser = await User.findOne({
            name : req.body.username
        })
        if (existingUser) {
            return res.status(411).json({
                message : 'User belonging to this username already exists. Please try different username'
            })
        }

        //If new user
        const user = await User.create({
            name : req.body.username,
            category : req.body.category
        })
        const userId = user._id

        res.status(500).json({
            userId
        })

    } catch (error) {
        console.error('login erroe:', error)
        res.status(500).json({
            message : 'Internal server error'
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