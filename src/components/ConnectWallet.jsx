import { useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl m-2 p-4 bg-red-100 flex justify-center">
      {walletAddress ? (
        <p>Connected: {walletAddress}</p>
      ) : (
        <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
