import Link from "next/link";

export const metadata = { title: "Guide — Admin" };

function Step({ n, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent font-mono text-xs text-accent">
        {n}
      </span>
      <div className="pb-1">
        <p className="text-sm font-medium">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>
      </div>
    </li>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function AdminHelpPage() {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Getting started</p>
      <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight">How to run your store</h1>
      <p className="mt-2 text-sm text-muted">
        Everything you need to manage CRAY STUFF yourself. No technical knowledge needed — if you can fill in a form,
        you can run the shop.
      </p>

      <div className="mt-8 space-y-6">
        <Card title="The two halves">
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-foreground">The store</span> — what customers see: homepage, shop, product pages,
              cart, checkout, Fire List, reviews.
            </li>
            <li>
              <span className="text-foreground">This admin panel</span> — only you. Add products, handle orders, accept
              or decline offers, read messages. Everything customers do lands here automatically.
            </li>
          </ul>
        </Card>

        <Card title="Add a product">
          <ol className="space-y-5">
            <Step n="1" title="Go to Products → + Add product">
              You&apos;ll get an empty form. Nothing goes live until you hit Create.
            </Step>
            <Step n="2" title="Upload the photos">
              Hit <span className="text-foreground">Upload photos</span> and pick them straight off your phone or
              computer — they upload and optimise automatically. You can also paste image links instead. The first photo
              is the main one customers see.
            </Step>
            <Step n="3" title="Fill in the details">
              Name, brand, price, size, condition and measurements. Be honest about flaws in the description — it builds
              trust and cuts returns.
            </Step>
            <Step n="4" title="Pick Type and Style tags">
              <span className="text-foreground">Type</span> is what the piece <em>is</em> (Hoodies, Pants, Shorts…) —
              this powers those sections. <span className="text-foreground">Style</span> is its vibe (Y2K, Vintage,
              Skate…). A piece can have both.
            </Step>
            <Step n="5" title="Set a min. offer (optional)">
              Customers never see this. Any offer at or above it is accepted instantly; anything below gets a polite
              automatic counter. Roughly 80% of your price is a good starting point.
            </Step>
            <Step n="6" title="Hit Create product">
              It&apos;s live on the store immediately. Open it on the site to check it looks right.
            </Step>
          </ol>
        </Card>

        <Card title="When something sells">
          <p className="text-sm leading-relaxed text-muted">
            Open the piece in <span className="text-foreground">Products → Edit</span> and tick{" "}
            <span className="text-foreground">Mark as Sold Out</span>. It stays visible (with a SOLD badge) and moves
            into the <Link href="/sold" className="text-accent hover:opacity-80">Recently Sold</Link> archive — which is
            great proof that pieces really do go.
          </p>
        </Card>

        <Card title="Day to day">
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-foreground">Orders</span> — every checkout appears here. Change the status as you go:
              New → Paid → Shipped → Delivered. The customer sees this in their order tracking.
            </li>
            <li>
              <span className="text-foreground">Offers</span> — most are handled automatically by your min. offer. Only
              the ones needing a decision show up for you to Accept or Decline.
            </li>
            <li>
              <span className="text-foreground">Messages</span> — contact-form messages and questions customers ask on a
              product. Answering product questions publicly helps future buyers too.
            </li>
          </ul>
        </Card>

        <Card title="A few tips">
          <ul className="space-y-2 text-sm leading-relaxed text-muted">
            <li>• Shoot every piece against the same background — it makes the whole shop look professional.</li>
            <li>• Photograph flaws on purpose. Honesty sells better than perfect photos.</li>
            <li>• Add a few pieces at a time rather than saving them all for one big drop.</li>
            <li>• Measurements matter more than size labels on vintage — always include them.</li>
          </ul>
        </Card>
      </div>

      <p className="mt-8 text-sm text-muted">
        Stuck on anything? Message me and I&apos;ll sort it — or walk you through it live.
      </p>
    </div>
  );
}
