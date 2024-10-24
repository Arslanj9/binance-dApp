import { useState } from "react";
import { ethers } from "ethers";
import { connectToWallet } from "./walletUtils";
// import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";


import CryptoSelector from "./SendTxForm/CryptoSelector";


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

  const [selectedIcon, setSelectedIcon] = useState("ETH"); 

  console.log(selectedIcon)
  


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

  


  





  return (
    <form onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-[32rem] sm:w-[26rem] border mx-auto rounded-3xl bg-white">
        <main className="mt-4 p-4">
          <p className="text-sm ml-3 text-gray-700 ">
            You pay
          </p>



          {/* ************************* You Pay input - Starts ****************************** */}

          <div className="my-3">
            <div className="relative flex items-center">

            <CryptoSelector selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />


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



          {/* **************************** Recipient Address - START **************************** */}


          <div className="my-3">
            <input
              name="addr"
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Recipient Address"
            />
          </div>

          {/* **************************** Recipient Address - END **************************** */}


          

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
