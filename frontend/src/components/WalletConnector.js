import React from 'react';
import useWeb3 from '../hooks/useWeb3';
import { toast } from 'react-toastify';

const WalletConnector = () => {
  const { account, connectWallet } = useWeb3();

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast.success('Wallet connected!');
    } catch (error) {
      toast.error('Failed to connect wallet.');
    }
  };

  return (
    <div className="wallet-connector">
      {account ? (
        <p>Connected Wallet: {account}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnector;
