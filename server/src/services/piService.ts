
   import { Pi } from "pi-sdk";
   import dotenv from "dotenv";

   dotenv.config();
   ```

2. **Error Handling and Logging**:
   Ensure that logging and error handling are appropriate and consistent. Consider using a logging library for better log management.

3. **Documentation**:
   Add comments and documentation for the functions and their parameters to improve code readability.

4. **Environment Variable Validation**:
   Validate environment variables before using them to avoid runtime errors.
   ```typescript
   if (!process.env.PI_SANDBOX) {
       throw new Error("Environment variable PI_SANDBOX is not set.");
   }
   Pi.init({
       version: "2.0",
       sandbox: process.env.PI_SANDBOX === "true",
   });
   ```

5. **Code DRYness**:
   Avoid repetitive code. The `init` function is called twice in the file. It can be refactored to be called once.

Here is a refactored version of the file:

```typescript
import { Pi } from "pi-sdk";
import dotenv from "dotenv";

dotenv.config();

// Validate environment variables
if (!process.env.PI_SANDBOX) {
    throw new Error("Environment variable PI_SANDBOX is not set.");
}

Pi.init({
    version: "2.0",
    sandbox: process.env.PI_SANDBOX === "true",
});

/**
 * Fetches a Pi payment by its ID.
 * @param {string} paymentId - The unique payment identifier from Pi.
 * @returns {Promise<any>} - Returns the payment details.
 */
export const getPiPayment = async (paymentId) => {
    return await Pi.getPayment(paymentId);
};

/**
 * Verifies a Pi payment transaction.
 * @param {string} paymentId - The unique payment identifier from Pi.
 * @returns {Promise<boolean>} - Returns true if the payment is verified, false otherwise.
 */
export const verifyPiTransaction = async (paymentId) => {
    try {
        if (!paymentId) {
            throw new Error("❌ Payment ID is required for verification.");
        }

        // Fetch payment details from Pi API
        const payment = await Pi.getPayment(paymentId);

        // Debugging logs (remove in production)
        console.log("🔍 Verifying Pi Payment:", JSON.stringify(payment, null, 2));

        // Validate response structure
        if (!payment || typeof payment.status !== "string") {
            console.error("⚠️ Invalid response from Pi API:", payment);
            return false;
        }

        // Normalize and check payment status
        const status = payment.status.toUpperCase();
        if (status === "COMPLETED") {
            console.log(`✅ Pi Payment Verified: ${paymentId}`);
            return true;
        } else {
            console.warn(`❌ Pi Payment Not Verified (Status: ${status}): ${paymentId}`);
            return false;
        }
    } catch (error) {
        console.error("⚠️ Error verifying Pi transaction:", error);
        
