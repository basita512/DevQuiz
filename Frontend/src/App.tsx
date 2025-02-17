import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Quiz from './Pages/Quiz'
import Result from './Pages/Result'
import Start from './Pages/Start'  

function App() {
    return (
        <div className="">
            <img src="../public/images/bgImage.jpg" alt="bg-image" className='w-full min-h-screen -z-10 relative' />
            <div className="absolute bg-[#000000ca] top-0 w-full min-h-screen">
                <Routes>
                    <Route path='/' element={<Home/>} ></Route>
                    <Route path='/start' element={<Start/>} ></Route>
                    <Route path='/quiz' element={<Quiz/>} ></Route>
                    <Route path='/result' element={<Result/>} ></Route>
                </Routes>
            </div> 
        </div>
  )
}

export default App
