import "server-only";
import Stripe from "stripe";

// Payments are optional until the keys are set. With STRIPE_SECRET_KEY present,
// checkout goes through Stripe; without it, the site falls back to recording the
// order for review (no charge). No code change needed to switch it on.
const KEY = process.env.STRIPE_SECRET_KEY;

export const stripe = KEY ? new Stripe(KEY) : null;
export const stripeEnabled = Boolean(KEY);
