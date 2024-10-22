import { useState } from 'react';

function ConnectWallet() {

    const [ walletAddress, setWalletAddress ] = useState("")

  const requestAccount = async () => {
    if (window.ethereum) {

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setWalletAddress(accounts[0])
            console.log(accounts)
        } catch (err) {
            console.log(err)
        }

    } else {
      alert("MetaMask not installed");
    }
  };

  return (
    <div>
      
        { walletAddress ? `Connected: ${walletAddress}` : <button className='bg-red-200 rounded-md p-2' onClick={requestAccount}>Connect Wallet</button> }
      
    </div>
  );
}

export default ConnectWallet;
