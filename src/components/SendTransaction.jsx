import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectToWallet } from "./walletUtils";
// import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import axios from "axios";

import CryptoSelector from "./SendTxForm/CryptoSelector";
import InputField from "./SendTxForm/InputField";




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

  const [youPayEthValue, setYouPayEthValue] = useState('');
  const [youGetethValue, setYouGetEthValue] = useState('');
  const [ethPrice, setEthPrice] = useState(null);
  const [usdValue, setUsdValue] = useState(0);  // Get USD after user has put the eths

  const [selectedIconForPay, setSelectedIconForPay] = useState("ETH"); // Icon for YOU PAY
  const [selectedIconForReceive, setSelectedIconForReceive] = useState("NOFILL"); // Icon for YOU RECEIVE

  const [isBalanceInfoVisible, setBalanceInfoVisible] = useState(false);
  const [isGasFeeInfoVisible, setGasFeeInfoVisible] = useState(false);
  const [isPercentageVisible, setisPercentageVisible] = useState()



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    // console.log(`data is ${JSON.stringify(data)}`)

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
        setEthPrice(response.data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
      }
    };

    fetchPrice();

    // Refresh price every minute
    const interval = setInterval(fetchPrice, 60000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);



  // Update USD equivalent when Ethereum value changes
  useEffect(() => {
    if (ethPrice && youPayEthValue) {
      setUsdValue(ethPrice * youPayEthValue);
    } else {
      setUsdValue(0);
    }
  }, [ethPrice, youPayEthValue]);


  // Handle You Pay Ethereum input change
  const handleYouPayEthValueChange = (value) => {
    setYouPayEthValue(value);
  };


  // Handle You Get Ethereum input change
  const handleYouGetEthValueChange = (value) => {
    setYouGetEthValue(value);
  };








  return (
    <form onSubmit={handleSubmit}>
      <div style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }} className="credit-card w-full lg:w-[32rem] sm:w-[26rem] border-opacity-5 mx-auto rounded-3xl">
        <main className="m-4 p-4">

          <div className="flex justify-between">
            <p className="text-sm ml-3">You pay</p>
            <p className="text-sm mr-3">Balance 0.00</p>
          </div>

          <div className="my-1">
            <div className="relative flex items-center">
              <CryptoSelector selectedIcon={selectedIconForPay} setSelectedIcon={setSelectedIconForPay} />
              <InputField
                name="ether"
                type="number"
                step="any"
                isPercentageVisible={false}
                usdValue={usdValue} // Display Ethereum price
                onChange={handleYouPayEthValueChange} // Get input value from YOU GET InputField

              />
            </div>
          </div>




          <div className="flex justify-between">
            {/* Gas Fee Info */}
            <div
              className="relative inline-block"
            >
              <p className="text-xs mt-1 ml-3 cursor-text flex items-center">
                + 0.00006 ~$1.5678
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
              <p className="text-xs mr-3 text-red-700 cursor-pointer flex items-center gap-1">
                {/* &#9888;  */}
                {/* Warning Icon */}
                <span
                  className="flex items-center justify-center w-3 h-3 cursor-pointer rounded-full border-2 bg-transparent text-red-600 border-red-600 text-[12px] font-medium ml-1">
                  !
                </span>
                Not enough balance
              </p>
              {isBalanceInfoVisible && (
                <div
                  className={`absolute right-0 mt-1 w-48 p-2  text-red-600 border border-white rounded shadow-lg z-10 
                        transition-all duration-300 transform ${isBalanceInfoVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                >
                  <p className="text-xs">You should have at least 12.0019 ETH in your balance to perform this trade.</p>
                </div>
              )}
            </div>
          </div>






          <p className="text-sm ml-3 mt-5 ">
            You receive
          </p>

          <div className="my-1">
            <div className="relative flex items-center">
              <CryptoSelector selectedIcon={selectedIconForReceive} setSelectedIcon={setSelectedIconForReceive} />
              <InputField
                name="youGetEther"
                type="text"
                step="any"
                isPercentageVisible={true}
                usdValue={192.34} // Display Ethereum price
                onChange={handleYouGetEthValueChange} // Get input value from YOU GET InputField
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
