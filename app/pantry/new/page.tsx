import type { Metadata } from "next";
import PantryForm from "@/components/pantry/PantryForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Pantry Item",
  description:
    "Add a new pantry item to your PantryPal inventory and track its expiration date.",
};

export default async function NewPantryItemPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="mx-auto max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          Add Pantry Item
        </h1>

        <p className="mt-2 text-slate-600">
          Add a new food item to your pantry and track its expiry date.
        </p>
      </div>

      <PantryForm />
    </section>
  );
}