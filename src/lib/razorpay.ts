import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import Razorpay from "razorpay";

export class RazorpayConfigurationError extends Error {
  constructor() {
    super("Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
    this.name = "RazorpayConfigurationError";
  }
}

export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new RazorpayConfigurationError();
  }

  return {
    client: new Razorpay({ key_id: keyId, key_secret: keySecret }),
    keyId,
    keySecret,
  };
}

export function checkoutAmountInPaise(checkout: {
  totalPrice?: {
    gross?: {
      amount?: number;
      currency?: string;
    };
  };
}): number {
  const amount = checkout.totalPrice?.gross?.amount;
  const currency = checkout.totalPrice?.gross?.currency;
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    throw new Error("Checkout total must be a positive amount.");
  }

  let amountInINR = amount;
  if (currency === "USD") {
    const configuredRate = process.env.RAZORPAY_USD_TO_INR_RATE || "83";
    const usdToInrRate = Number(configuredRate);
    if (!Number.isFinite(usdToInrRate) || usdToInrRate <= 0) {
      throw new Error("RAZORPAY_USD_TO_INR_RATE must be a positive number.");
    }
    amountInINR *= usdToInrRate;
  } else if (currency !== "INR") {
    throw new Error(`Razorpay checkout does not support Saleor currency ${currency || "unknown"}.`);
  }

  const amountInPaise = Math.round(amountInINR * 100);
  if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
    throw new Error("Checkout total is outside the supported Razorpay amount range.");
  }
  return amountInPaise;
}

export function verifyRazorpaySignature(
  keySecret: string,
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!/^[a-f\d]{64}$/i.test(signature)) {
    return false;
  }

  const expected = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest();
  const provided = Buffer.from(signature, "hex");
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}
