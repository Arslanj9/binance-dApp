import { useState } from "react";


const InputField = ({ name, type, step, usdValue, onChange, isPercentageVisible }) => {

    const [isDialogVisible, setDialogVisible] = useState(false);

    const handleChange = (event) => {
        onChange(event.target.value); // Send input value to parent
    };




    return (
        <div className="relative w-full ml-2">
            <input
                name={name}
                type={type}
                step={step} // Allow any decimal value
                onChange={handleChange} // Call handleChange when input changes
                className="px-5 py-2 border border-gray-300 rounded-3xl w-full focus:outline-none focus:ring focus:border-blue-300 pr-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {usdValue > 0 && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500  text-right">
                    <span className="text-xs block">
                        ~${usdValue.toFixed(2)}
                    </span>


                    {isPercentageVisible && (
                        <>
                            <span
                                onMouseEnter={() => setDialogVisible(true)}
                                onMouseLeave={() => setDialogVisible(false)}
                                className="text-xs block cursor-pointer" // Added cursor-pointer for better UX
                            >
                                (-0.0748%)
                            </span>

                            {isDialogVisible && (
                                <div
                                    className={`absolute right-0 mt-1 w-48 p-2 bg-red-100 text-red-700 border border-red-300 rounded shadow-lg transition-all duration-300 z-20'
                                        }`}
                                >
                                    <p className="text-xs">
                                        You should have at least 12.0019 ETH in your balance to perform this trade.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default InputField