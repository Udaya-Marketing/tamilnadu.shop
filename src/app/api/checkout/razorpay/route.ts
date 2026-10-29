import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createCheckout,
  getCheckoutById,
  getCheckoutDeliveryMethods,
  getUserCheckout,
  getValidToken,
  updateCheckoutAddress,
  updateCheckoutDeliveryMethod,
  updateCheckoutEmail,
} from "@/services/saleor";
import {
  checkoutAmountInPaise,
  getRazorpayClient,
  RazorpayConfigurationError,
} from "@/lib/razorpay";

interface CheckoutLineInput {
  variantId: string;
  quantity: number;
}

interface CheckoutAddress {
  firstName?: string;
  lastName?: string;
  streetAddress1?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

function isCheckoutLineInputArray(value: unknown): value is CheckoutLineInput[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item: unknown) =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as CheckoutLineInput).variantId === "string" &&
        (item as CheckoutLineInput).variantId.length > 0 &&
        Number.isInteger((item as CheckoutLineInput).quantity) &&
        (item as CheckoutLineInput).quantity > 0
    )
  );
}

export async function POST(request: Request) {
  try {
    const rawBody: unknown = await request.json();
    if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
    }
    const body = rawBody as Record<string, unknown>;
    const cookieStore = await cookies();
    const token = await getValidToken(cookieStore);

    let checkout;
    if (token) {
      checkout = await getUserCheckout(token);
    } else {
      if (!isCheckoutLineInputArray(body.items)) {
        return NextResponse.json(
          { error: "A valid cart is required to start checkout." },
          { status: 400 }
        );
      }
      checkout = await createCheckout(undefined, body.items);
    }

    if (!checkout?.id) {
      return NextResponse.json(
        { error: "A Saleor checkout could not be established." },
        { status: 400 }
      );
    }

    const rawAddress = body.address;
    const address =
      rawAddress && typeof rawAddress === "object" && !Array.isArray(rawAddress)
        ? (rawAddress as CheckoutAddress)
        : undefined;
    const phone = typeof body.phone === "string" ? body.phone : "";
    if (
      typeof address?.streetAddress1 !== "string" ||
      !address.streetAddress1 ||
      typeof address.city !== "string" ||
      !address.city ||
      typeof address.country !== "string" ||
      !address.country ||
      !phone
    ) {
      return NextResponse.json(
        { error: "Contact and shipping address details are required." },
        { status: 400 }
      );
    }

    if (!token) {
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      const emailResult = await updateCheckoutEmail(
        undefined,
        checkout.id,
        `${cleanPhone || "guest"}_${Date.now()}@gubera.com`
      );
      if (!emailResult) {
        return NextResponse.json(
          { error: "Could not set checkout contact details." },
          { status: 500 }
        );
      }
    }

    const checkoutAddress = {
      firstName: address.firstName || "Guest",
      lastName: address.lastName || "Customer",
      streetAddress1: address.streetAddress1,
      city: address.city,
      postalCode: address.postalCode || "00000",
      country: address.country,
      phone,
    };
    const shippingResult = await updateCheckoutAddress(
      token,
      checkout.id,
      checkoutAddress,
      true
    );
    const billingResult = await updateCheckoutAddress(
      token,
      checkout.id,
      checkoutAddress,
      false
    );
    if (!shippingResult || !billingResult) {
      return NextResponse.json(
        { error: "Could not set checkout shipping and billing addresses." },
        { status: 500 }
      );
    }

    const deliveryMethods = await getCheckoutDeliveryMethods(token, checkout.id);
    if (deliveryMethods.length > 0) {
      const deliveryResult = await updateCheckoutDeliveryMethod(
        token,
        checkout.id,
        deliveryMethods[0].id
      );
      if (!deliveryResult) {
        return NextResponse.json(
          { error: "Could not set the checkout delivery method." },
          { status: 500 }
        );
      }
    }

    checkout = await getCheckoutById(token, checkout.id);
    if (!checkout) {
      return NextResponse.json(
        { error: "Saleor checkout could not be refreshed." },
        { status: 500 }
      );
    }

    const amount = checkoutAmountInPaise(checkout);
    const { client, keyId } = getRazorpayClient();
    const receiptId = checkout.id.replace(/[^a-zA-Z0-9]/g, "").slice(-20) || `${Date.now()}`;
    const order = await client.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${receiptId}`,
      notes: { checkoutId: checkout.id },
    });

    return NextResponse.json({
      success: true,
      checkoutId: checkout.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error("API /api/checkout/razorpay POST error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof RazorpayConfigurationError
            ? error.message
            : "Unable to initialize Razorpay checkout.",
      },
      { status: error instanceof RazorpayConfigurationError ? 503 : 500 }
    );
  }
}
