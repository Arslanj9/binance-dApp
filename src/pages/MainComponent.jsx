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
      <div className="flex justify-center space-x-4 my-4">
        <button 
          className={`px-4 py-2 rounded-lg ${activeSection === "sendTransaction" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleButtonClick("sendTransaction")}
        >
          Market
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeSection === "fee" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleButtonClick("fee")}
        >
          Fee
        </button>
      </div>

      {/* Main content rendering */}
      <div className="my-4">
        {activeSection === "sendTransaction" && <SendTransaction />}
        {activeSection === "fee" && <Fee />}
      </div>
    </div>
  );
};

export default MainContent;
