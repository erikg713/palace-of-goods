export const logOrderCompletion = async (orderId: string, transactionId: string) => {
  const isVerified = await verifyPiTransaction(transactionId);
  if (!isVerified) {
    console.log(`❌ Skipping Web3 log for unverified order: ${orderId}`);
    return;
  }

  const transaction = await web3.eth.sendTransaction({
    from: process.env.ADMIN_WALLET,
    to: process.env.LOGGING_CONTRACT,
    value: web3.utils.toWei("0.001", "ether"),
    data: web3.utils.utf8ToHex(`Order ${orderId} completed on Pi Network`),
  });

  console.log(`✅ Web3 Log Added: ${transaction.transactionHash}`);
};
