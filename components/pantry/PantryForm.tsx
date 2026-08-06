"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createPantryItem } from "@/app/pantry/new/actions";

export type PantryFormData = {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
};

interface PantryFormProps {
  initialData?: PantryFormData;
  submitText?: string;
  onSubmit?: (data: PantryFormData) => Promise<void>;
}

function SubmitButton({
  text,
}: {
  text: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Saving..." : text}
    </button>
  );
}

export default function PantryForm({
  initialData,
  submitText = "Add Pantry Item",
  onSubmit,
}: PantryFormProps) {
  const [error, setError] = useState("");

  async function handleAction(formData: FormData) {
    setError("");

    if (onSubmit) {
      await onSubmit({
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        quantity: Number(formData.get("quantity")),
        unit: formData.get("unit") as string,
        expirationDate: formData.get("expirationDate") as string,
      });

      return;
    }

    const result = await createPantryItem(formData);

    if (result?.success === false) {
      setError(result.message);
    }
  }

  return (
    <form
      action={handleAction}
      className="space-y-5 rounded-xl bg-white p-6 shadow-md"
    >
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Item Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialData?.name ?? ""}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          id="category"
          name="category"
          defaultValue={initialData?.category ?? ""}
          required
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="">Select category</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruit">Fruit</option>
          <option value="Meat">Meat</option>
          <option value="Snacks">Snacks</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            required
            defaultValue={initialData?.quantity ?? 1}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="unit" className="mb-2 block text-sm font-medium">
            Unit
          </label>

          <select
            id="unit"
            name="unit"
            defaultValue={initialData?.unit ?? "pcs"}
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="pcs">Pieces (pcs)</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Gram (g)</option>
            <option value="L">Litre (L)</option>
            <option value="ml">Millilitre (ml)</option>
            <option value="packet">Packet</option>
            <option value="can">Can</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="expirationDate"
          className="mb-2 block text-sm font-medium"
        >
          Expiration Date
        </label>

        <input
          id="expirationDate"
          name="expirationDate"
          type="date"
          required
          defaultValue={initialData?.expirationDate ?? ""}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <SubmitButton text={submitText} />
    </form>
  );
}