const User = require('../Models/user')

const getLeaderboard = async (req, res) => {
    try {
        const leaderBoard = await User.findOne({})
        .select(' name selectedCategory score ')
        .sort({ score : -1 })
        .limit(10)

        const { userId } = req.query
        let userStats = null

        if (userId) {
            const user = await User.findById(userId)
            if (user) {
                const ranking = await User.countDocuments({
                    score : { $gt : user.score}
                })
            }

            userStats = {
                rank : ranking + 1,
                name : user.name,
                score : user.score,
                category : user.selectedCategory
            }
        }

        res.status(200).json({
            success : true,
            leaderBoard,
            userStats
        })


    } catch (error) {
        console.error('Error fetching leaderboard:', error)
        res.status(500).json({
            success : false,
            message : 'Error fetching Leaderboard',
            error : error.message
        })
    }
}

module.exports = getLeaderboard
