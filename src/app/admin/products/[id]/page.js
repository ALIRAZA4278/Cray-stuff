export default async function AdminEditProductPage({ params }) {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Product: {id}</h1>
      <p className="mt-2 text-muted">Product edit form goes here.</p>
    </div>
  );
}
