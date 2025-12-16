// Check if Pi SDK is available in the browser
const Pi = typeof window !== "undefined" ? (window as any).Pi : null;

export interface PiUser {
  uid: string;
  username: string;
}

export interface PiPayment {
  identifier: string;
  amount: number;
  memo: string;
  metadata: object;
  status: string;
}

// **Initialize Pi Network SDK**
export const initializePi = () => {
  if (!Pi) {
    console.error("❌ Pi Network SDK not found. Ensure the SDK is loaded in index.html.");
    return;
  }

  try {
    if (!Pi.isInitialized) {
      Pi.init({ version: "2.0", sandbox: true }); // Set sandbox to false for mainnet
      console.log("✅ Pi Network SDK initialized.");
    }
  } catch (error) {
    console.error("❌ Pi Network SDK initialization failed:", error);
  }
};

// **Authenticate Pi User**
export const authenticatePiUser = async (): Promise<PiUser | null> => {
  if (!Pi) {
    console.error("❌ Pi SDK is not available.");
    return null;
  }

  try {
    const user = await Pi.authenticate(["username", "uid"]);
    console.log("✅ Pi User authenticated:", user);
    return { uid: user.uid, username: user.username };
  } catch (error) {
    console.error("❌ Pi Network authentication failed:", error);
    return null;
  }
};

// **Initiate Pi Payment**
export const initiatePiPayment = async (
  amount: number,
  memo: string,
  metadata: object = {}
): Promise<PiPayment | null> => {
  if (!Pi) {
    console.error("❌ Pi SDK is not available.");
    return null;
  }

  try {
    const payment = await Pi.createPayment({
      amount,
      memo,
      metadata,
      uid: Pi.currentUser?.uid,
    });

    console.log("✅ Pi Payment initiated:", payment);

    return {
      identifier: payment.identifier,
      amount: payment.amount,
      memo: payment.memo,
      metadata: payment.metadata,
      status: payment.status,
    };
  } catch (error) {
    console.error("❌ Pi Network payment failed:", error);
    return null;
  }
};
