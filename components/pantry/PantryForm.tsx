"use client";

import { useState } from "react";

export interface PantryFormData {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

interface PantryFormProps {
  initialData?: PantryFormData;
  onSubmit: (data: PantryFormData) => Promise<void>;
  submitText?: string;
}

export default function PantryForm({
  initialData,
  onSubmit,
  submitText = "Save",
}: PantryFormProps) {
  const [formData, setFormData] = useState<PantryFormData>({
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    quantity: initialData?.quantity ?? 1,
    unit: initialData?.unit ?? "pcs",
    expirationDate: initialData?.expirationDate ?? "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Item Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-1 font-medium">
          Category
        </label>

        <input
          id="category"
          name="category"
          type="text"
          required
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block mb-1 font-medium">
          Quantity
        </label>

        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          required
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="unit" className="block mb-1 font-medium">
          Unit
        </label>

        <select
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="pcs">pcs</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="L">L</option>
          <option value="ml">ml</option>
        </select>
      </div>

      <div>
        <label htmlFor="expirationDate" className="block mb-1 font-medium">
          Expiration Date
        </label>

        <input
          id="expirationDate"
          name="expirationDate"
          type="date"
          required
          value={formData.expirationDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
