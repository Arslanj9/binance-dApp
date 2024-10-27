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
                style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }}
                className="px-5 py-2 border  rounded-3xl w-full focus:outline-none focus:ring focus:border-blue-300 pr-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {usdValue > 0 && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500  text-right">
                    <span className="text-xs block">
                        ~${usdValue.toFixed(2)}
                    </span>


                    {isPercentageVisible && (
                        <>
                            <span className="text-xs cursor-text flex items-center">
                                (-0.0748%)
                                <span
                                    onMouseEnter={() => setDialogVisible(true)}
                                    onMouseLeave={() => setDialogVisible(false)}
                                    className="flex items-center justify-center cursor-pointer w-3 h-3 rounded-full border-2 bg-transparent text-white border-white text-[12px] font-medium ml-1">
                                    !
                                </span>
                            </span>

                            {isDialogVisible && (
                                <div
                                    className={`absolute right-0 w-48 p-2  border rounded shadow-lg transition-all duration-300 z-20'
                                        }`}
                                >
                                    <p className="text-xs text-left">
                                    You will receive the buy price or better, so you do not need to set a slippage tolerance. Cross-chain trades between a single asset (e.g. USDC) have zero price impact, regardless of your order size.
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