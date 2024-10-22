import { useState } from "react";
import { ethers } from "ethers";
import { connectToWallet } from "./walletUtils";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

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
  const [error, setError] = useState(null);
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError(null);

    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr"),
    });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH Payment
          </h1>
          <div className="my-3">
            <input
              type="text"
              name="addr"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Recipient Address"
            />
          </div>
          <div className="my-3">
            <input
              name="ether"
              type="text"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Amount in ETH"
            />
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full bg-blue-200 rounded-lg py-2"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
