import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store"
import { useNavigate } from "react-router-dom"
import { RootState } from '../store'
import { useEffect, useState } from "react"
import axios from "axios"
import { increamentScore, setCurrentQuestion } from "../Slices/quizSlice"
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

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/${category}/${userId}/question/${currentQuestion}`)
                setQuizState((prev) => ({
                    ...prev,
                    question: response.data,
                    selectedOption: '',
                    isAnswered : false,
                    feedback: null
                }))
            } catch (error) {
                console.error('Error fetching questions: ', error)
            }
            
        }
        fetchQuestion()
    }, [currentQuestion, category, userId])


    const handleVerifyAnswer = async (option : string) => {
        try {
            if (quizState.feedback || !quizState.question){
                return
            }

            setQuizState((prev) => ({
                ...prev,
                selectedOption : option,
                isAnswered : true
            }))

            const response = await axios.post(`http://localhost:5000/api/quiz/${category}/${userId}/checkAnswer`, {
                questionId : quizState.question.id,
                selectedAnswer : option
            })

            setQuizState((prev) => ({
                ...prev,
                feedback : {
                    isCorrect : response.data.isCorrect,
                    message : response.data.message,
                    correctAnswer : response.data.correctAnswer,
                    explanation : response.data.explanation
                }
            }))

            if(response.data.isCorrect) {
                dispatch(increamentScore())
            }

        } catch (error) {
            console.error('Error in verifying answer', error)
        }
    }


    const handleNext = () => {
        if (remainingQuestion === 0) {
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
                    <div className="mt-6 flex justify-center">
                        <Button
                            text={remainingQuestion === 0 ? "See Results" : "Next Question"}
                            onClick={handleNext}
                        />
                    </div>
                )}

            </div>
            
        </div>
    )
}

export default Quiz
