import { Pi } from "pi-sdk";

export const authenticatePiUser = async () => {
  Pi.init({ version: "2.0", sandbox: true });
  try {
    const scopes = ["username", "payments"];
    const user = await Pi.authenticate(scopes);
    return user;
  } catch (error) {
    console.error("Pi Network Authentication failed:", error);
    return null;
  }
};

import { PiNetwork } from "@pinetwork-js/sdk"; // Hypothetical SDK (Replace with actual one)

const Pi = (window as any).Pi; // Access Pi Network SDK in the browser

export const authenticatePiUser = async (): Promise<PiUser | null> => {
  try {
    const user = await Pi.authenticate(["username", "uid"]);
    return { uid: user.uid, username: user.username };
  } catch (error) {
    console.error("Pi Network authentication failed:", error);
    return null;
  }
};

export const initiatePiPayment = async (amount: number, memo: string, metadata = {}): Promise<PiPayment | null> => {
  try {
    const payment = await Pi.createPayment({
      amount,
      memo,
      metadata,
      uid: (window as any).Pi.currentUser?.uid,
    });

    return {
      identifier: payment.identifier,
      amount: payment.amount,
      memo: payment.memo,
      metadata: payment.metadata,
      status: payment.status,
    };
  } catch (error) {
    console.error("Pi Network payment failed:", error);
    return null;
  }
};
