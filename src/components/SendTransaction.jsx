import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectToWallet } from "./walletUtils";
// import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import axios from "axios";

import CryptoSelector from "./SendTxForm/CryptoSelector";

// import InputField from "./SendTxForm/InputField";
import YouPayInputField from "./SendTxForm/YouPayInputField";
import YouGetInputField from "./SendTxForm/YouGetInputField"

import calculateFee from '../utils/calculateFee';




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




export default function SendTransaction({ walletAddress, balance }) {
  // const [error, setError] = useState(null);
  const [txs, setTxs] = useState([]);

  const [youPay_EthInput, setYouPay_EthInput] = useState('');
  const [youGet_EthInput, setYouGet_EthInput] = useState('');
  const [calculatedFee, setCalculatedFee] = useState(0);

  // const [ethPrice, setEthPrice] = useState(null);
  const [ethToUsdRate, setEthToUsdRate] = useState(null);
  const [youPayUSDValue, setYouPayUSDValue] = useState(0);  // Get USD after user has put the eths
  const [youGetUSDValue, setYouGetUSDValue] = useState(0);  // Get USD after user has put the eths

  const [selectedIconForPay, setSelectedIconForPay] = useState("ETH"); // Icon for YOU PAY
  const [selectedIconForReceive, setSelectedIconForReceive] = useState("ETH"); // Icon for YOU RECEIVE

  const [isBalanceInfoVisible, setBalanceInfoVisible] = useState(false);
  const [isGasFeeInfoVisible, setGasFeeInfoVisible] = useState(false);
  
  // Convert youPayEthValue and balance to numbers for comparison
  const isBalanceInsufficient = youPay_EthInput && parseFloat(youPay_EthInput) > parseFloat(balance);






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


  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        setEthToUsdRate(response.data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
      }
    };

    fetchPrice();

    // Refresh price every minute
    const interval = setInterval(fetchPrice, 60000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);



  // Update YouPay USD equivalent when Ethereum value changes
  useEffect(() => {
    if (ethToUsdRate && youPay_EthInput) {
      setYouPayUSDValue(ethToUsdRate * youPay_EthInput);
    } else {
      setYouPayUSDValue(0);
    }
  }, [ethToUsdRate, youPay_EthInput]);


  // Update YouGet USD equivalent when Ethereum value changes
  useEffect(() => {
    if (ethToUsdRate && youGet_EthInput) {
      setYouGetUSDValue(ethToUsdRate * youGet_EthInput);
    } else {
      setYouGetUSDValue(0);
    }
  }, [ethToUsdRate, youGet_EthInput]);







  // Handle You Pay Ethereum input change
  const handleYouPay_EthInputChange = (value) => {

    if (value === '') {
      setYouPay_EthInput(value);
      setYouGet_EthInput('');
    } else {
      const newValue = Number(value); // Convert input value to a number
      const fee = calculateFee(newValue); // Calculate the fee based on the new value
      setCalculatedFee(fee); // Update the calculated fee state
      setYouPay_EthInput(value); // Update the You Pay input state
      setYouGet_EthInput(newValue - fee); // Set You Get input based on the calculated fee
    }
  };



  // Handle You Get Ethereum input change
  const handleYouGet_EthInputChange = (value) => {

    if (value === '') {
      setYouGet_EthInput(value);
      setYouPay_EthInput(''); // Clear first input if second input is empty
    } else {
      const newValue = Number(value);
      const fee = calculateFee(newValue); // Calculate the fee based on the new value
      setCalculatedFee(fee); // Update the calculated fee state
      setYouGet_EthInput(value);
      setYouPay_EthInput(newValue + fee); // Update first input value
    }
  };













  return (
    <form onSubmit={handleSubmit}>
      <div style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }} className="credit-card w-full lg:w-[32rem] sm:w-[26rem] border-opacity-5 mx-auto rounded-3xl">
        <main className="m-4 p-4">


          {walletAddress && (
            <div className="flex justify-center  mb-9">
              <p className="text-gray-500">
                Connected Wallet: <span className="font-semibold text-gray-500">{walletAddress.slice(0, 7)}...</span>
              </p>
            </div>
          )}


          {/* ---- YOU PAY --- */}
          <div className="flex justify-between">
            <p className="text-sm ml-3">You pay</p>
            <p
              className={`text-sm mr-3 flex gap-2 ${balance === "0.000" ? "text-red-500" : "text-white"
                }`}
            >
              Balance:
              {balance !== null && (
                <span className="font-semibold">{balance} ETH</span>
              )}
            </p>
          </div>

          <div className="my-1">
            <div className="relative flex items-center">
              <CryptoSelector selectedIcon={selectedIconForPay} setSelectedIcon={setSelectedIconForPay} />
              <YouPayInputField
                name="youPayEth"
                type="number"
                step="any"
                value={youPay_EthInput}
                youPayUSDValue={youPayUSDValue} // Display Ethereum price
                onChange={handleYouPay_EthInputChange} // Get input value from YOU GET InputField
              />
            </div>
          </div>



          <div className="flex justify-between">
            {/* Gas Fee Info */}
            <div
              className="relative inline-block"
            >
              <p className="text-xs mt-1 ml-3 cursor-text flex items-center">

                + {calculatedFee.toFixed(5)} ETH ~${(calculatedFee * ethToUsdRate).toFixed(4)}
                {/* Informational Icon */}
                <span
                  onMouseEnter={() => setGasFeeInfoVisible(true)}
                  onMouseLeave={() => setGasFeeInfoVisible(false)}
                  className="flex items-center justify-center w-3 h-3 cursor-pointer rounded-full border-2 bg-transparent text-white border-white text-[12px] font-medium ml-1">
                  !
                </span>
              </p>
              {isGasFeeInfoVisible && (
                <div
                  className={`absolute left-0 w-48 p-2 border rounded z-10 
                        `}
                >
                  <p className="text-xs">Included gas is paid on top of the amount and covers takers' gas costs to fulfill your trade</p>
                </div>
              )}
            </div>

            {/* Balance Warning */}
            <div
              className="relative inline-block z-1"
              onMouseEnter={() => setBalanceInfoVisible(true)}
              onMouseLeave={() => setBalanceInfoVisible(false)}
            >
              {isBalanceInsufficient > 0 && (
                <p className="text-xs mr-3 mt-1 text-red-700 cursor-pointer flex items-center gap-1">
                  {/* Warning Icon */}
                  <span className="flex items-center justify-center w-3 h-3 cursor-pointer rounded-full border-2 bg-transparent text-red-600 border-red-600 text-[12px] font-medium ml-1">
                    !
                  </span>
                  Not enough balance
                </p>
              )}
              {isBalanceInfoVisible && (
                <div
                  className={`absolute right-0 mt-1 w-48 p-2  text-red-600 border border-white rounded shadow-lg z-10 
                        transition-all duration-300 transform ${isBalanceInfoVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                >
                  <p className="text-xs">You should have at least {calculatedFee + youPay_EthInput} ETH in your balance to perform this trade.</p>
                </div>
              )}
            </div>
          </div>













          {/* ---- YOU RECEIVE --- */}
          <p className="text-sm ml-3 mt-8 ">
            You receive
          </p>

          <div className="my-1">
            <div className="relative flex items-center">
              <CryptoSelector selectedIcon={selectedIconForReceive} setSelectedIcon={setSelectedIconForReceive} />
              <YouGetInputField
                name="youGetEth"
                type="number"
                step="any"
                value={youGet_EthInput}
                youPayUSDValue={youGetUSDValue} // Display Ethereum price
                onChange={handleYouGet_EthInputChange} // Get input value from YOU GET InputField
              />
            </div>
          </div>




          <div className="my-3">
            <input
              name="addr"
              type="text"
              className="w-full px-4 py-2 border  rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
              style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }}
              placeholder="Recipient Address"
            />
          </div>

          {/* **************************** Recipient Address - END **************************** */}




        </main>


        <div className="p-4 m-2">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full bg-blue-700 rounded-lg py-2"
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
