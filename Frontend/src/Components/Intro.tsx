import Button from "./Button"

const Intro = () => {
  return (
    <div>
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center leading-tight">
            Challenge Your Mind, Test Your Knowledge
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl text-center mt-4">
            Try it now 
        </p>
        
        <div className="w-1/5 mt-6 mx-auto">
            <Button text='Get Started'/>
        </div>
        
    </div>
  )
}

export default Intro
