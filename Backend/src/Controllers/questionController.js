const express = require('express')
const FrontendQuiz = require('../Models/quiz')
const BackendQuiz = require('../Models/quiz')

const askedQuestions = new Map()

const getCategoryquestions = async (req, res) => {
    try {
        const { category, userId } = req.params
        let selectedCategory

        if (category === 'frontend') {
            selectedCategory = FrontendQuiz
        } else if (category === 'backend') {
            selectedCategory = BackendQuiz
        }

        const allQuestions = await selectedCategory.find()

    } catch (error) {
        
    }
}

const submitAnswer = async (req, res) => {
    const { questionId, selectedAnswer } = req.body

    
}

module.exports = {
    getCategoryquestions, submitAnswer
}