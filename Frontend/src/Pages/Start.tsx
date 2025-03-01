import Button from "../Components/Button"
import axios from "axios"
import { AppDispatch, RootState } from "../store"
import { setCategory, setName, setErrorMessage, setUserId } from "../Slices/quizSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetQuiz } from "../Slices/quizSlice"
import ApiError from "../Components/ApiError"
const Start = () => {
    const dispatch = useDispatch<AppDispatch>()
    const name = useSelector((state: RootState) => state.quiz.name)
    const category = useSelector((state: RootState) => state.quiz.category)
    const errorMessage = useSelector((state: RootState) => state.quiz.errorMessage)
    const navigate = useNavigate()
  
     

    const handleStart = async () => {
        // event.preventDefault()

        try {
            if (!name) {
                alert('Please enter your name')
                return
            }
            // console.log(name, category)
            const response = await axios.post('http://localhost:5000/api/user/start', {
                name: name,
                category: category,
            })

            if (!response.data.success) {
                dispatch(setErrorMessage(response.data.message))
                return
            }


            if (response.data.success && response.data.userId) {  
                // Reset quiz state for new user
                dispatch(resetQuiz())
                
                dispatch(setUserId(response.data.userId))
                dispatch(setCategory(category))
                dispatch(setName(name))
                
                navigate('/quiz')
            } else {
                alert('Failed to start quiz. Please try again.')
            }

        } catch (error: any) {
            console.error('Error starting quiz:', error)
            alert('An error occurred while starting the quiz. Please try again.')
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message 
                || 'An error occurred while starting the quiz. Please try again.'
            alert(errorMessage)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-[#0c0c0c] p-8 rounded-2xl shadow-lg shadow-[#222222] border-2 border-[#222222]">
                <h1 className="text-3xl font-bold mb-8 text-white text-center">
                    Let's get started
                </h1>

                {errorMessage && (
                    <ApiError errorMessage={errorMessage} />
                )}

                <div className="mb-8">
                    <p className="text-lg font-medium text-white mb-4">
                        Select Category
                    </p>

                    <div className="space-y-4">
                        <label className="flex items-center cursor-pointer hover:bg-black p-3 rounded-lg transition-colors">
                            <input 
                                type="radio"
                                value="frontend"
                                checked={category === 'frontend'}
                                onChange={(e) => dispatch(setCategory(e.target.value))}
                                className="w-5 h-5 accent-pink-400 mr-4"
                            />
                            <span className="text-white text-lg">
                                Frontend
                            </span>
                        </label>

                        <label className="flex items-center cursor-pointer hover:bg-black p-3 rounded-lg transition-colors">
                            <input 
                                type="radio"
                                value="backend"
                                checked={category === 'backend'}
                                onChange={(e) => dispatch(setCategory(e.target.value))}
                                className="w-5 h-5 accent-pink-400 mr-4"
                            />
                            <span className="text-white text-lg">
                                Backend
                            </span>
                        </label>
                    </div>
                </div>

                <div className="mb-8">
                    <input 
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => dispatch(setName(e.target.value))}
                        className="w-full px-4 py-3 rounded-lg bg-black  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex justify-center">
                    <Button 
                        text="Start Quiz" 
                        onClick={handleStart}/>
                </div>
            </div>
        </div>
    )
}

export default Start
