import { useState } from 'react';
import ConnectWallet from "../components/ConnectWallet";
import SendTransaction from "../components/SendTransaction";
import Fee from "../components/Fee"; 

const MainContent = () => {
  const [activeSection, setActiveSection] = useState("sendTransaction"); // Default active section

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">MetaMask Wallet Integration</h1>
      <div className="my-4">
        <ConnectWallet />
      </div>

      {/* Button section */}
      <div className="flex justify-center lg:mr-52 sm:mr-44 mt-8">
        <button 
          className={`px-6 py-0 border border-grey-300 rounded-tl-3xl rounded-tr-3xl focus:outline-none ${activeSection === "sendTransaction" ? 'bg-blue-500 text-white' : 'bg-white'}`} 
          onClick={() => handleButtonClick("sendTransaction")}
        >
          Market
        </button>
        <button 
          className={`ml-1 px-6 py-0 border border-grey-300 rounded-tl-3xl rounded-tr-3xl ${activeSection === "fee" ? 'bg-blue-500 text-white' : 'bg-white'}`} 
          onClick={() => handleButtonClick("fee")}
        >
          Fee
        </button>
      </div>

      {/* Main content rendering */}
      <div>
        {activeSection === "sendTransaction" && <SendTransaction />}
        {activeSection === "fee" && <Fee />}
      </div>
    </div>
  );
};

export default MainContent;
