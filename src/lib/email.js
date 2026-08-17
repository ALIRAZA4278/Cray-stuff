import "server-only";
import { Resend } from "resend";

// Email is optional infrastructure: everything works without it (orders still
// save, sign-ups still record). The moment RESEND_API_KEY + EMAIL_FROM are set,
// confirmations and welcome emails start going out — no code change needed.
const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || "CRAY STUFF <onboarding@resend.dev>";
const ADMIN_TO = process.env.ADMIN_NOTIFY_EMAIL;

const resend = KEY ? new Resend(KEY) : null;

export const emailEnabled = Boolean(resend);

async function send({ to, subject, html }) {
  if (!resend || !to) return { skipped: true };
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
    return { sent: true };
  } catch (e) {
    return { error: e?.message || "send failed" };
  }
}

// ── shared shell ──────────────────────────────────────────────────────────
function shell(title, inner) {
  return `<div style="background:#0d0b12;padding:32px 0;font-family:Arial,Helvetica,sans-serif;color:#e9e7ee">
    <div style="max-width:520px;margin:0 auto;background:#16131c;border:1px solid #2a2733;border-radius:12px;overflow:hidden">
      <div style="padding:24px 28px;border-bottom:1px solid #2a2733">
        <span style="font-size:20px;font-weight:800;letter-spacing:.5px;color:#fff">CRAY <span style="color:#8b5cf6">STUFF</span></span>
      </div>
      <div style="padding:28px">
        <h1 style="margin:0 0 12px;font-size:20px;color:#fff">${title}</h1>
        ${inner}
      </div>
      <div style="padding:18px 28px;border-top:1px solid #2a2733;color:#8a8794;font-size:12px">
        Cray Stuff — Wear Something Different, Style With a Story.
      </div>
    </div>
  </div>`;
}

function itemRows(items = []) {
  return items
    .map(
      (it) =>
        `<tr><td style="padding:6px 0;color:#cbc9d3;font-size:14px">${it.name || it.slug}</td>
         <td style="padding:6px 0;text-align:right;color:#fff;font-size:14px">${Number(it.price || 0)} zł</td></tr>`,
    )
    .join("");
}

// ── customer order confirmation ─────────────────────────────────────────────
export async function sendOrderConfirmation(order) {
  const inner = `
    <p style="margin:0 0 16px;color:#cbc9d3;font-size:14px;line-height:1.6">
      Thanks ${order.customer_name || "friend"} — we've got your order <b style="color:#fff">${order.id}</b> and it's in our queue.
      We ship within 24 hours via ${order.carrier || "your chosen carrier"}.
    </p>
    <table style="width:100%;border-collapse:collapse;margin:8px 0 4px">${itemRows(order.items)}</table>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #2a2733;margin-top:8px">
      <tr><td style="padding:10px 0;color:#fff;font-weight:700">Total</td>
      <td style="padding:10px 0;text-align:right;color:#8b5cf6;font-weight:700">${Number(order.total || 0)} zł</td></tr>
    </table>
    <p style="margin:16px 0 0;color:#8a8794;font-size:13px">We'll email you again when it ships. Reply to this email if you need anything.</p>`;
  return send({ to: order.email, subject: `Order confirmed — ${order.id}`, html: shell("Order confirmed 🖤", inner) });
}

// ── admin notification ──────────────────────────────────────────────────────
export async function sendAdminOrderNotification(order) {
  if (!ADMIN_TO) return { skipped: true };
  const inner = `
    <p style="margin:0 0 12px;color:#cbc9d3;font-size:14px">New order <b style="color:#fff">${order.id}</b> — ${Number(order.total || 0)} zł</p>
    <p style="margin:0 0 12px;color:#cbc9d3;font-size:14px">${order.customer_name} · ${order.email}<br/>${order.address || ""}, ${order.city || ""} ${order.postal_code || ""} ${order.country || ""}<br/>Carrier: ${order.carrier || "—"}</p>
    <table style="width:100%;border-collapse:collapse">${itemRows(order.items)}</table>`;
  return send({ to: ADMIN_TO, subject: `New order ${order.id} — ${Number(order.total || 0)} zł`, html: shell("New order", inner) });
}

// ── newsletter welcome ──────────────────────────────────────────────────────
export async function sendNewsletterWelcome(email) {
  const inner = `
    <p style="margin:0 0 16px;color:#cbc9d3;font-size:14px;line-height:1.6">
      Welcome to the Cray Stuff club — you'll be first to know about new drops and exclusive offers.
    </p>
    <p style="margin:0 0 8px;color:#cbc9d3;font-size:14px">Here's 10% off your first order:</p>
    <div style="display:inline-block;border:1px solid #8b5cf6;background:rgba(139,92,246,.12);color:#8b5cf6;font-weight:700;letter-spacing:2px;font-size:18px;padding:10px 18px;border-radius:8px">WELCOME10</div>
    <p style="margin:16px 0 0;color:#8a8794;font-size:13px">Enter it at checkout.</p>`;
  return send({ to: email, subject: "Welcome to Cray Stuff — 10% off inside", html: shell("Welcome 🖤", inner) });
}
