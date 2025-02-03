const Cards = ({ icons, title, description, style }) => {
    return (
        <div
            className={`w-4/5 rounded-2xl bg-white max-w-[400px] h-[250px] shadow-lg shadow-gray-500 cursor-pointer ${style}`}
        >
            <div
                className="flex flex-col items-center justify-between relative py-4 px-6"
            >
                <span className="relative mx-auto -mt-16 mb-8">
                    <img src={icons} alt={`Astrapi Technolgoy: ${title}`} className="w-20" />
                </span>

                <h5 className="text-md font-semibold mb-2 text-left mr-auto text-black underline">
                    {title}
                </h5>

                <p className="w-full mb-4 text-sm text-justify text-zinc-700">
                    {description}
                    <a
                        className="mb-2 text-sm cursor-pointer font-semibold transition-colors hover:text-[#634647] underline underline-offset-2"
                    >Privacy Policy</a
                    >
                </p>

                <button
                    className="mb-2 text-sm mr-auto text-zinc-600 cursor-pointer font-semibold transition-colors hover:text-[#634647] hover:underline underline-offset-2"
                >
                    Details
                </button>
            </div>
        </div>

    )
}

export default Cards
