import Web3 from "web3";

let web3: Web3 | null = null;

// Check if MetaMask (or any Web3 provider) is available
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  console.error("MetaMask or Web3 provider not found.");
}

// Function to request user account
export const getAccount = async (): Promise<string | null> => {
  if (!web3) {
    console.error("Web3 provider is not initialized.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0] || null;
  } catch (error) {
    console.error("Error fetching account:", error);
    return null;
  }
};

// Function to check network
export const getNetwork = async (): Promise<string | null> => {
  if (!web3) return null;
  const networkId = await web3.eth.net.getId();
  return networkId.toString();
};

// Function to send
