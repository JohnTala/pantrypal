"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PantryForm, {
  PantryFormData,
} from "@/components/pantry/PantryForm";

export default function EditPantryItemPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [item, setItem] = useState<PantryFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/pantry/${id}`);

        if (!response.ok) {
          throw new Error("Failed to load pantry item.");
        }

        const data = await response.json();

        setItem({
          name: data.name,
          category: data.category,
          quantity: data.quantity,
          unit: data.unit,
          expirationDate: data.expirationDate.slice(0, 10),
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load pantry item.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchItem();
    }
  }, [id]);

  async function handleUpdate(data: PantryFormData) {
    try {
      const response = await fetch(`/api/pantry/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update pantry item.");
      }

      router.push("/pantry");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update pantry item.");
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <p className="text-slate-600">Loading pantry item...</p>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="mb-4 text-3xl font-bold text-red-600">
          Pantry Item Not Found
        </h1>

        <p className="text-slate-600">
          {error || "The requested pantry item could not be found."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          Edit Pantry Item
        </h1>

        <p className="mt-2 text-slate-600">
          Update your pantry item information below.
        </p>
      </div>

      <PantryForm
        initialData={item}
        submitText="Update Pantry Item"
        onSubmit={handleUpdate}
      />
    </main>
  );
}