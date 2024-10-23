import { useState } from "react";
import { ethers } from "ethers";
import { connectToWallet } from "./walletUtils";
// import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { IoIosArrowDown } from "react-icons/io";
import { cryptoIcons } from '../cryptoIcons'

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    const { signer } = await connectToWallet(); // Use utility to connect

    // Ensure the recipient address is valid
    ethers.getAddress(addr);

    // Send the transaction
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.parseEther(ether),
    });

    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function SendTransaction() {
  // const [error, setError] = useState(null);
  const [txs, setTxs] = useState([]);

  const [selectedIcon, setSelectedIcon] = useState("ETH"); // Default to Ethereum icon
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // setError(null);

    await startPayment({
      // setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr"),
    });
  };

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
  ];





  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-[32rem] sm:w-[26rem] shadow-lg mx-auto rounded-3xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH Payment
          </h1>



          {/* ************************* You Pay input - Starts ****************************** */}

          <div className="my-3">
            <div className="relative flex items-center">

              {/* Crypto Icon and Dropdown */}
              <div className="relative">
                {/* Button to toggle the blocks */}

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center px-4 py-2 w-full border border-grey-300 rounded-3xl focus:outline-none"
                >
                  {/* Display selected icon */}
                  <div className="flex items-center">
                    {/* <TokenIcon symbol={selectedIcon} variant="branded" className="mr-2" /> */}
                    <img src={cryptoIcons[selectedIcon]} alt={selectedIcon.toLowerCase()} className="mr-1" />
                    <h1>{selectedIcon}</h1>
                  </div>
                  {/* Arrow Icon */}
                  <IoIosArrowDown className="text-gray-600 ml-4" />
                </button>



                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute z-50 mt-2 border rounded-lg shadow-lg w-full">

                    {/* DROPDOWN ICONS */}
                    <div className="grid lg:grid-cols-3 gap-2 p-2 rounded-xl bg-blue-200 lg:w-[30rem] sm:w-[24rem] sm:grid-cols-2">
                      {cryptoOptions.map((crypto) => (
                        <button
                          key={crypto.symbol}
                          className={`flex items-center relative px-2 py-1 border rounded-3xl transition duration-200 
                          ${crypto.isActive ? 'bg-white border-grey-300 hover:bg-gray-100' : 'opacity-50 cursor-not-allowed bg-gray-200'}`}
                          onClick={() => crypto.isActive && handleIconClick(crypto.symbol)} // Only call handleIconClick if active
                          disabled={!crypto.isActive} // Disable button if inactive
                        >
                          {/* Overlay for disabled buttons */}
                          {!crypto.isActive && (
                            <div className="absolute inset-0 bg-gray-100 opacity-60 rounded-3xl" />
                          )}
                          <img src={cryptoIcons[crypto.symbol]} alt={crypto.symbol.toLowerCase()} className="mr-1" />
                          {crypto.name}
                        </button>
                      ))}
                    </div>

                  </div>
                )}
              </div>



              {/* Input Field for YOU_PAY */}

              <input
                name="ether"
                type="number"
                className="px-5 py-2 ml-2 border border-gray-300 rounded-3xl w-full focus:outline-none focus:ring focus:border-blue-300 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Amount in ETH"
              />

            </div>
          </div>




          {/* **************************** You Pay input - END ****************************** */}




          <div className="my-3">
            <input
              name="addr"
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Recipient Address"
            />
          </div>

        </main>


        <div className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full bg-blue-200 rounded-lg py-2"
          >
            Pay now
          </button>
          {/* <ErrorMessage message={error} /> */}
          <TxList txs={txs} />
        </div>
      </div>
    </form>
  );
}
