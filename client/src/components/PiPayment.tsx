import { useState } from "react";
import { initiatePiPayment } from "../utils/pi";

const PiPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handlePayment = async () => {
    const payment = await initiatePiPayment(1, "Test Payment");
    if (payment) {
      setPaymentStatus(`Payment ${payment.status}`);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay 1 Pi</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PiPayment;
