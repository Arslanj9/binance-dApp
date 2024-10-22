import ConnectWallet from "./components/ConnectWallet";
import SendTransaction from "./components/SendTransaction";

export default function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">MetaMask Wallet Integration</h1>
      <div className="my-4">
        <ConnectWallet />
      </div>
      <div className="my-4">
        <SendTransaction />
      </div>
    </div>
  );
}
