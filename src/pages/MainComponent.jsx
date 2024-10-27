import { useState } from 'react';
import ConnectWallet from "../components/ConnectWallet";
import SendTransaction from "../components/SendTransaction";
import Fee from "../components/Fee";


const MainContent = () => {
  const [activeSection, setActiveSection] = useState("sendTransaction"); // Default active section
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0.00");



  const handleButtonClick = (section) => {
    setActiveSection(section);
  };




  return (
    <div>
      <div className="my-4">
        <ConnectWallet setWalletAddress={setWalletAddress} walletAddress={walletAddress} setBalance={setBalance} />
      </div>


      {/* Button section */}
      <div className="flex justify-center lg:mr-52 sm:mr-44 mt-8">
        <button
          className={`px-6 py-0 rounded-tl-3xl rounded-tr-3xl focus:outline-none ${activeSection === "sendTransaction" ? 'bg-blue-500 text-white' : 'bg-[rgb(0, 0, 24)]'}`}
          style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }}
          onClick={() => handleButtonClick("sendTransaction")}
        >
          Market
        </button>
        <button
          className={`ml-1 px-6 py-0 rounded-tl-3xl rounded-tr-3xl ${activeSection === "fee" ? 'bg-blue-500 text-white' : 'bg-[rgb(0, 0, 24)]'}`}
          style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }}
          onClick={() => handleButtonClick("fee")}
        >
          Fee
        </button>
      </div>

      {/* Main content rendering */}
      <div>
        {activeSection === "sendTransaction" && <SendTransaction walletAddress={walletAddress} balance={balance} />}
        {activeSection === "fee" && <Fee />}
      </div>
    </div>
  );
};

export default MainContent;
