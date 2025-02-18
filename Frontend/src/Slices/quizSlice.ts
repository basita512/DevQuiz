import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Defining state
interface QuizState {
    name: string
    category : string,
    score : number,
    userId : string,
    currentQuestion : number,
    remainingQuestion : number,
    errorMessage : string
}

// Initializing state
const initialState : QuizState = {
    name : '',
    category : 'frontend',
    score : 0,
    userId : '',
    currentQuestion : 0,
    remainingQuestion : 10,
    errorMessage : ''
}

const quizSlice = createSlice({
    name : 'quiz',
    initialState,
    reducers : {
        setName : (state, action: PayloadAction<string>) =>{
            state.name = action.payload
        },
        setCategory : (state, action : PayloadAction<string>) => {
            state.category = action.payload
        },
        setScore : (state, action : PayloadAction<number>) => {
            state.score = action.payload
        },
        setUserId : (state, action : PayloadAction<string>) => {
            state.userId = action.payload
        },
        increamentScore : (state) => {
            state.score += 10
        },
        setCurrentQuestion : (state, action : PayloadAction<number>) => {
            state.currentQuestion = action.payload
        },
        setRemainingQuestion : (state, action : PayloadAction<number>) => {
            state.remainingQuestion = action.payload
        },
        setErrorMessage : (state, action : PayloadAction<string>) => {
            state.errorMessage = action.payload
        },
        resetQuiz : () => {
            return initialState
        }
    }
})

export const {
    setName,
    setCategory,
    setCurrentQuestion,
    setRemainingQuestion,
    setScore,
    increamentScore,
    setUserId,
    setErrorMessage,
    resetQuiz  
} = quizSlice.actions

export default quizSlice.reducer



