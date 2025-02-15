type ButtonProps = {
    text : string
    onClick : () => void
}

const Button = ({ text, onClick } : ButtonProps) => {
    return (
        <div onClick={onClick}
        className="bg-black border-1 border-gray-400  text-white font-semibold py-3 px-6 rounded-full hover:border-1 hover:border-pink-400 hover:shadow-sm hover:text-base hover:shadow-pink-400 text-center duration-300 active:bg-pink-500 ">
            {text}
        </div>
    )
}

export default Button
