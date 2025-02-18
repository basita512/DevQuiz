import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store"
import { useNavigate } from "react-router-dom"
import { RootState } from '../store'
import { useEffect, useState } from "react"
import axios from "axios"
import { increamentScore, setCurrentQuestion, setRemainingQuestion } from "../Slices/quizSlice"
import Button from "../Components/Button"

interface Question {
    id : number
    question : string
    options : string[]
}

interface QuestionState {
    question : Question | null
    selectedOption : string
    isAnswered : boolean
    feedback : {
        isCorrect : boolean
        message : string
        correctAnswer? : string
        explanation? : string
    } | null 
}

const Quiz = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const currentQuestion = useSelector((state: RootState) => state.quiz.currentQuestion)
    const remainingQuestion = useSelector((state: RootState) => state.quiz.remainingQuestion)
    const category = useSelector((state:RootState) => state.quiz.category)
    const userId = useSelector((state:RootState) => state.quiz.userId)

    const [quizState, setQuizState] = useState<QuestionState>({
        question : null,
        selectedOption : '',
        isAnswered : false,
        feedback : null
    })

    // Debug log
    useEffect(() => {
        console.log('Quiz component state:', {
            category,
            userId,
            currentQuestion,
            remainingQuestion
        })
    }, [category, userId, currentQuestion, remainingQuestion])

    useEffect(() => {
        const fetchQuestion = async () => {
            if (!userId) {
                console.error('User ID is not available')
                return
            } 

            try {
                console.log('Fetching the params', {category, userId, currentQuestion})
                const response = await axios.get(`http://localhost:5000/api/quiz/${category}/${userId}/question/${currentQuestion}`)
                if (response.data.success) {
                    setQuizState((prev) => ({
                        ...prev,
                        question: response.data.question,
                        selectedOption: '',
                        isAnswered: false,
                        feedback: null
                    }))
                    dispatch(setRemainingQuestion(response.data.remainingQuestions))
                }
            } catch (error) {
                console.error('Error fetching questions: ', error)
            }
        }
        fetchQuestion()
    }, [currentQuestion, category, userId, dispatch])


    const handleVerifyAnswer = async (option : string) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/quiz/${category}/${userId}/checkAnswer`,
                {
                    questionId: quizState.question?.id,
                    selectedAnswer: option
                }
            )

            if (response.data.success) {
                setQuizState(prev => ({
                    ...prev,
                    selectedOption: option,
                    isAnswered: true,
                    feedback: {
                        isCorrect: response.data.isCorrect,
                        message: response.data.message,
                        correctAnswer: response.data.correctAnswer,
                        explanation: response.data.explanation
                    }
                }))

            if(response.data.isCorrect) {
                dispatch(increamentScore())
            }
          } 
        } catch (error) {
          console.error('Error in verifying answer', error)
      }
    } 

    const handleNext = () => {
        if (currentQuestion === 9) {
            navigate('/result')
        } else {
            dispatch(setCurrentQuestion(currentQuestion + 1))
        }
    }

    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-2xl bg-[#0c0c0c] p-8 rounded-2xl shadow-lg shadow-[#222222] border-2 border-[#222222]">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-white">Question: {currentQuestion + 1}/10</span>
                        <span className="text-white">Remaining: {remainingQuestion}</span>
                    </div>
                    <h2 className="text-xl text-white mb-6">{quizState.question?.question}</h2>
                    <div className="space-y-3">
                        {quizState.question?.options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => !quizState.isAnswered && handleVerifyAnswer(option)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors
                                    ${quizState.selectedOption === option 
                                        ? quizState.feedback?.isCorrect 
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                        : 'bg-black hover:bg-[#1a1a1a]'
                                    }
                                    ${quizState.isAnswered ? 'cursor-not-allowed' : 'hover:bg-[#1a1a1a]'}
                                    ${option === quizState.feedback?.correctAnswer ? 'bg-green-500 text-white' : ''}
                                `}
                            >
                                <span className="text-white">{option}</span> 
                            </div>
                        ))}
                    </div>
                </div>
                
                {quizState.isAnswered && (
                    <div className="mt-6">
                        <div className={`p-4 rounded-lg mb-4 ${
                            quizState.feedback?.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                            <p className="text-white mb-2">
                              {quizState.feedback?.message}
                            </p>
                            {quizState.feedback?.explanation && (
                                <p className="text-gray-400 text-sm">
                                  {quizState.feedback.explanation}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center items-center">
                            <Button
                                text={currentQuestion === 9 ? "See Results" : "Next Question"}
                                onClick={handleNext}
                            />  
                        </div>
                    </div>
                )}

            </div>
            
        </div>
    )
}

export default Quiz
