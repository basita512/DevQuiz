import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Quiz from './Pages/Quiz'
import Result from './Pages/Result'


function App() {
    return (
        <div className="">
            <img src="../public/images/bgImage.jpg" alt="bg-image" className='w-full min-h-screen -z-10 relative' />
            <div className="absolute bg-[#000000ca] top-0 w-full min-h-screen">
                <Routes>
                    <Route path='/' element={<Home/>} ></Route>
                    <Route path='/play' element={<Quiz/>} ></Route>
                    <Route path='/result' element={<Result/>} ></Route>
                </Routes>
            </div> 
        </div>
  )
}

export default App
