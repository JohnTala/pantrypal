"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PantryForm from "@/components/pantry/PantryForm";

type PantryFormData = {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
};

export default function EditPantryItemPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [item, setItem] = useState<PantryFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/items/${id}`);

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchItem();
    }
  }, [id]);

  async function handleUpdate(data: PantryFormData) {
    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Failed to update pantry item.");
      return;
    }

    alert("Pantry item updated successfully!");

    router.push("/pantry");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p>Pantry item not found.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Edit Pantry Item
      </h1>

      <PantryForm
        initialData={item}
        submitText="Update Item"
        onSubmit={handleUpdate}
      />
    </main>
  );
}