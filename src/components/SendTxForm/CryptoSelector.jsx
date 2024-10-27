import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { cryptoIcons } from '../../cryptoIcons'


const CryptoSelector = ({ selectedIcon, setSelectedIcon }) => {

    const [isOpen, setIsOpen] = useState(false); // Toggle dropdown

    const handleIconClick = (symbol) => {
        setSelectedIcon(symbol);
        setIsOpen(false);
    };


    // Array of cryptocurrencies
    const cryptoOptions = [
        { symbol: "ETH", name: "Ethereum", isActive: true },
        { symbol: "ARBITRUM", name: "Arbitrum", isActive: false },
        { symbol: "AVALANCHE", name: "Avalanche", isActive: false },
        { symbol: "BASE", name: "Base", isActive: false },
        { symbol: "BNB", name: "BNB Chain", isActive: false },
        { symbol: "LINEA", name: "Linea", isActive: false },
        { symbol: "OPTIMISM", name: "Optimism", isActive: false },
        { symbol: "POLY", name: "Polygon", isActive: false },
        { symbol: "SOLANA", name: "Solana", isActive: false },
        { symbol: "NOFILL", name: "USDC", isActive: true },
    ];

    // const iconName = selectedIcon;



    return (

        <div className="relative" >
            {/* Button to toggle the blocks */}

            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }}
                className="flex items-center px-4 py-2 w-full rounded-3xl focus:outline-none"
            >
                {/* Display selected icon */}
                <div className="flex items-center">
                    <img src={cryptoIcons[selectedIcon]} alt={selectedIcon.toLowerCase()} className="mr-1" />
                    <h1>{selectedIcon}</h1>
                </div>
                {/* Arrow Icon */}
                <IoIosArrowDown className="text-gray-600 ml-4" />
            </button>



            {/* Dropdown Menu */}
            {isOpen && (
                <div  className="absolute z-50 mt-2 rounded-lg shadow-lg w-full">

                    {/* DROPDOWN ICONS */}
                    <div style={{ border: "3px solid rgba(255, 254, 254, 0.219)" }} className="grid lg:grid-cols-3 gap-2 p-2 rounded-xl lg:w-[28rem] sm:w-[24rem] sm:grid-cols-2">
                        {cryptoOptions.map((crypto) => (
                            <button
                                key={crypto.symbol}
                                style={{ border: "2px solid rgba(255, 254, 254, 0.219)" }}
                                className={`flex items-center relative px-2 py-1 border rounded-3xl transition duration-200 
                                ${crypto.isActive ? 'border-grey-300 hover:bg-slate-700' : 'opacity-50 cursor-not-allowed'}`}
                                onClick={() => crypto.isActive && handleIconClick(crypto.symbol)} // Only call handleIconClick if active
                                disabled={!crypto.isActive} // Disable button if inactive
                            >
                                {/* Overlay for disabled buttons */}
                                {!crypto.isActive && (
                                    <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-3xl" />
                                )}
                                <img src={cryptoIcons[crypto.symbol]} alt={crypto.symbol.toLowerCase()} className="mr-1 bg-transparent" />
                                {crypto.name}
                            </button>
                        ))}
                    </div>

                </div>
            )}
        </div>
    )
}

export default CryptoSelector