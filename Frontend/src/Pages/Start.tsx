import Button from "../Components/Button"
import axios from "axios"
import { AppDispatch, RootState } from "../store"
import { setCategory, setName, setUserId } from "../Slices/quizSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const Start = () => {
    const dispatch = useDispatch<AppDispatch>()
    const name = useSelector((state: RootState) => state.quiz.name)
    const category = useSelector((state: RootState) => state.quiz.category)
    const navigate = useNavigate()
  
     

    const handleStart = async () => {
        // event.preventDefault()

        try {
            if (!name) {
                alert('Please enter your name')
                return
            }

            const response = await axios.post('http://localhost:5000/api/user/start', {
                name : name,
                category : category
            })

            dispatch(setUserId(response.data.userId))

            navigate('/quiz')

        } catch (error) {
            console.error('Error starting quiz:', error)
            alert('An error occurred while starting the quiz. Please try again.')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-[#0c0c0c] p-8 rounded-2xl shadow-lg shadow-[#222222] border-2 border-[#222222]">
                <h1 className="text-3xl font-bold mb-8 text-white text-center">
                    Let's get started
                </h1>

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
