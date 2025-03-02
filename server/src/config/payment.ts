import Stripe from "stripe";
import { config } from "./index";

export const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: "2023-10-16",
});
