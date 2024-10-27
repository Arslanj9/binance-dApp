import { connectToWallet } from "./walletUtils";

export default function ConnectWallet({ setWalletAddress, setBalance, walletAddress }) {
  // const [walletAddress, setWalletAddress] = useState("");

  
  const connectWallet = async () => {
    try {
      const { address, balance } = await connectToWallet();
      setWalletAddress(address);
      setBalance(balance);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };



  return (
    <div className="w-full flex justify-center">
      {walletAddress ? (
        <p className="bg-green-500 text-white px-8 py-1 rounded">Connected</p>
      ) : (
        <button className="bg-red-500 text-white px-8 py-1  rounded" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
