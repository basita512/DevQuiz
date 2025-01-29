import '../App.css'

const Title = () => {
  return (
    <div className="flex h-40 mt-12 w-full justify-center items-center">
        <div className="relative ">
            <h2 className="absolute text-transparent text-[10rem] -translate-x-1/2 -translate-y-1/2 stroke-2 stroke-color">
                DevQuiz 
            </h2>
            <h2 className="absolute bg-lime-300 bg-clip-text text-transparent text-[10rem] -translate-x-1/2 -translate-y-1/2 animate-clip">
                DevQuiz 
            </h2>
        </div>
    </div>
  )
}

export default Title
