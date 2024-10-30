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
    <div className='md:pb-2 pb-0'>
      <div className="my-4">
        <ConnectWallet setWalletAddress={setWalletAddress} walletAddress={walletAddress} setBalance={setBalance} />
      </div>


      {/* Button section */}
      <div className="flex justify-center lg:mr-52 sm:mr-44 mt-12">
        <button
          className={`px-8 py-0 rounded-tl-2xl rounded-tr-2xl focus:outline-none ${activeSection === "sendTransaction" ? 'bg-slate-400 bg-opacity-40 text-white' : 'bg-[rgb(0, 0, 24)]'}`}
          style={{ border: "1px solid rgba(255, 254, 254, 0.219)" }}
          onClick={() => handleButtonClick("sendTransaction")}
        >
          Market
        </button>
        <button
          className={`ml-1 px-8 py-0 rounded-tl-2xl rounded-tr-2xl ${activeSection === "fee" ? 'bg-slate-400 bg-opacity-40 text-white' : 'bg-[rgb(0, 0, 24)]'}`}
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
