import { ethers } from "ethers";

export const connectToWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  // Request account access from MetaMask
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  // Create a provider
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Get the signer
  const signer = await provider.getSigner();

  // Get the wallet address
  const address = await signer.getAddress();

  return { provider, signer, address };
};
