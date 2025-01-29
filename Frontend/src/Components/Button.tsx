type ButtonProps = {
    text : string
}

const Button = ({ text } : ButtonProps) => {
    return (
        <div className="bg-black border-1 border-gray-400  text-white font-semibold py-3 px-6 rounded-full hover:border-1 hover:border-pink-400 hover:shadow-sm hover:text-base hover:shadow-pink-400 text-center duration-300 active:bg-pink-500 ">
            {text}
        </div>
    )
}

export default Button
