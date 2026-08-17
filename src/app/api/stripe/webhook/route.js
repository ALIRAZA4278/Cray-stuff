import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";

// Stripe calls this when a payment completes. Set STRIPE_WEBHOOK_SECRET and point
// a Stripe webhook at /api/stripe/webhook for the "checkout.session.completed"
// event. Marks the order Paid and fires the confirmation emails.
export async function POST(req) {
  if (!stripe) return new NextResponse("Stripe not configured", { status: 400 });

  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();

  let event;
  try {
    event = secret ? stripe.webhooks.constructEvent(body, sig, secret) : JSON.parse(body);
  } catch (e) {
    return new NextResponse(`Webhook error: ${e.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event.data?.object?.metadata?.orderId;
    if (orderId) {
      const supabase = createAdminClient();
      await supabase.from("orders").update({ status: "Paid" }).eq("id", orderId);
      const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).maybeSingle();
      if (order) {
        try {
          await sendOrderConfirmation(order);
          await sendAdminOrderNotification(order);
        } catch {}
      }
    }
  }

  return NextResponse.json({ received: true });
}
