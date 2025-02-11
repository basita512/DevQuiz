const express = require('express')
const FrontendQuiz = require('../Models/quiz')
const BackendQuiz = require('../Models/quiz')

const askedQuestions = new Map()

const getCategoryquestions = async (req, res) => {
    try {
        // 1.Get Parameters
        const { category, userId } = req.params
       
        // 2.Select Database Model
        let selectedCategory 
        if (category === 'frontend') {
            selectedCategory = FrontendQuiz
        } else if (category === 'backend') {
            selectedCategory = BackendQuiz
        }

        // 3.Fetch All Questions
        const allQuestions = await selectedCategory.find()
        // check if the user is has been asked questions
        if (!askedQuestions.has(userId)) {
            askedQuestions.set(userId, new Set())
        }

        // 4.Get User's Question History
        const userAskedQuestions = askedQuestions.get(userId)
        const availableQuestions = allQuestions.filter(q => {
            return !userAskedQuestions.has(q.id)
        })

        // 5.Check if All Questions Used
        if (availableQuestions.length === 0) {
            userAskedQuestions.clear()
            return res.status(200).json({
                success : true,
                message : 'All questions completed',
                remainingQuestions : 10
            }) 
        }

        // 6.Making a random index and finding it in availableQuestions array
        const randomIndex = Math.floor(Math.random() * availableQuestions.length)
        const selectedQuestion = availableQuestions[randomIndex]

        // 7.checking the size of userAskedQuestions array, ifless than 10 then sending new question
        userAskedQuestions.add(selectedQuestion.id)
        if (userAskedQuestions.size >= 10) {
            userAskedQuestions.clear()
        }
        res.status(200).json({
            success : true,
            question : {
                id : selectedQuestion.id,
                question : selectedQuestion.question,
                options : selectedQuestion.options
            },
            remainingQuestions : 10 - userAskedQuestions.size
        })
        console.log(userAskedQuestions)

    } catch (error) {
        console.error('Error in getting questions')
        res.status(500).json({
            success : false,
            message : 'Internal Server error',
            error : error.message
        })
    }
}

const submitAnswer = async (req, res) => {
    const { questionId, selectedAnswer } = req.body

    
}

module.exports = {
    getCategoryquestions, submitAnswer
}