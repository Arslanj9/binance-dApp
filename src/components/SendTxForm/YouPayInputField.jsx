import { useState, useEffect } from "react";

const YouPayInputField = ({ name, type, step, youPayUSDValue, value, onChange }) => {
    


    const handleChange = (event) => {
        const inputVal = event.target.value;
        onChange(inputVal);         // Send input to parent component
    };

    return (
        <div className="relative w-full ml-2">
            <input
                name={name}
                type={type}
                step={step} // Allow any decimal value
                onChange={handleChange} // Call handleChange when input changes
                value={value} // Use local state for controlled input
                style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }}
                className="px-5 py-2 border rounded-3xl w-full focus:outline-none focus:ring focus:border-blue-300 pr-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {youPayUSDValue > 0 && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-right">
                    <span className="text-xs block">
                        ~${youPayUSDValue.toFixed(2)}
                    </span>
                </div>
            )}
        </div>
    );
}

export default YouPayInputField;
