import type { Metadata } from "next";

interface EditPantryItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: EditPantryItemPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Edit Pantry Item ${id}`,
    description: `Edit the details of pantry item ${id} in PantryPal.`,
  };
}

export default async function EditPantryItemPage() {
  return (
    <section>
      <h1>Edit Pantry Item</h1>
    </section>
  );
}