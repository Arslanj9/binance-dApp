import { useState } from 'react';
import { ethers } from 'ethers'

function ConnectWallet() {

    const [ walletAddress, setWalletAddress ] = useState("")

    const requestAccount = async () => {
        if (window.ethereum) {
          try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
    
            // Create an ethers provider (updated for ethers v6)
            const provider = new ethers.BrowserProvider(window.ethereum);
    
            // Get the signer (the connected wallet account)
            const signer = await provider.getSigner();
    
            // Get the connected wallet address
            const address = await signer.getAddress();
    
            console.log('Connected wallet address:', address);
    
            setWalletAddress(address);
          } catch (err) {
            console.log(err);
          }
        } else {
          alert('MetaMask not installed');
        }
      };

  return (
    <div>
      
        { walletAddress ? `Connected: ${walletAddress}` : <button className='bg-red-200 rounded-md p-2' onClick={requestAccount}>Connect Wallet</button> }
      
    </div>
  );
}

export default ConnectWallet;
