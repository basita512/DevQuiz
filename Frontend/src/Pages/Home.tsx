import Intro from '../Components/Intro'
import Title from '../Components/Title'
import '../App.css'

const Home = () => {
  return (
    <div className="main flex flex-col items-center justify-center h-screen">
        <div className="title">
            <Title/>
        </div>
        <div className="mt-12 w-full flex justify-center">
            <Intro/>
        </div>
    </div>
  )
}

export default Home
