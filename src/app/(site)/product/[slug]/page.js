export default async function ProductPage({ params }) {
  const { slug } = await params;

  return (
    <div className="px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Product: {slug}</h1>
      <p className="mt-2 text-zinc-400">Gallery, details, price, and offer/Q&A go here.</p>
    </div>
  );
}
