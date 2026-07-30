interface PantryItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PantryItemPage({
  params,
}: PantryItemPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-3xl font-bold text-green-600">
        Pantry Item
      </h1>

      <p className="text-slate-600">
        Pantry item ID: {id}
      </p>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-slate-500">
          This page will display the details of a pantry item.
        </p>
      </div>
    </section>
  );
}