import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  completeCheckout,
  getCheckoutById,
  getValidToken,
} from "@/services/saleor";
import {
  checkoutAmountInPaise,
  getRazorpayClient,
  RazorpayConfigurationError,
  verifyRazorpaySignature,
} from "@/lib/razorpay";

interface CompletionRequest {
  checkoutId?: string;
  paymentInfo?: {
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
    razorpaySignature?: string;
  };
}

export async function POST(request: Request) {
  try {
    const rawBody: unknown = await request.json();
    if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return NextResponse.json({ error: "Invalid payment completion request." }, { status: 400 });
    }
    const body = rawBody as CompletionRequest;
    const checkoutId = typeof body.checkoutId === "string" ? body.checkoutId.trim() : "";
    const paymentId =
      typeof body.paymentInfo?.razorpayPaymentId === "string"
        ? body.paymentInfo.razorpayPaymentId
        : "";
    const orderId =
      typeof body.paymentInfo?.razorpayOrderId === "string"
        ? body.paymentInfo.razorpayOrderId
        : "";
    const signature =
      typeof body.paymentInfo?.razorpaySignature === "string"
        ? body.paymentInfo.razorpaySignature
        : "";

    if (!checkoutId || !paymentId || !orderId || !signature) {
      return NextResponse.json(
        { error: "Checkout and payment details are required." },
        { status: 400 }
      );
    }

    const { client, keySecret } = getRazorpayClient();
    if (!verifyRazorpaySignature(keySecret, orderId, paymentId, signature)) {
      return NextResponse.json({ error: "Razorpay payment signature is invalid." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = await getValidToken(cookieStore);
    const [checkout, razorpayOrder, payment] = await Promise.all([
      getCheckoutById(token, checkoutId),
      client.orders.fetch(orderId),
      client.payments.fetch(paymentId),
    ]);

    if (!checkout?.id || checkout.id !== checkoutId) {
      return NextResponse.json({ error: "Saleor checkout could not be found." }, { status: 404 });
    }
    if (razorpayOrder.notes?.checkoutId !== checkoutId) {
      return NextResponse.json(
        { error: "Razorpay order does not match this checkout." },
        { status: 400 }
      );
    }

    const expectedAmount = checkoutAmountInPaise(checkout);
    if (
      Number(razorpayOrder.amount) !== expectedAmount ||
      razorpayOrder.currency !== "INR" ||
      Number(payment.amount) !== expectedAmount ||
      payment.currency !== "INR" ||
      payment.order_id !== orderId
    ) {
      return NextResponse.json(
        { error: "Razorpay payment amount does not match the Saleor checkout." },
        { status: 400 }
      );
    }
    if (payment.status !== "captured") {
      return NextResponse.json(
        { error: "Razorpay payment has not been captured. Please contact support if charged." },
        { status: 402 }
      );
    }

    const order = await completeCheckout(token, checkoutId);
    if (!order) {
      return NextResponse.json(
        { error: "Payment was captured, but Saleor could not complete the order." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.number,
      total: order.total?.gross?.amount || 0,
      currency: order.total?.gross?.currency || "INR",
    });
  } catch (error) {
    console.error("API /api/checkout/complete POST error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof RazorpayConfigurationError
            ? error.message
            : "Failed to verify payment and complete checkout.",
      },
      { status: error instanceof RazorpayConfigurationError ? 503 : 500 }
    );
  }
}
