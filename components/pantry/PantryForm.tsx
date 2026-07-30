"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createPantryItem } from "@/app/pantry/new/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Adding Item..." : "Add Pantry Item"}
    </button>
  );
}

export default function PantryForm() {
  const [error, setError] = useState("");

  return (
    <form
      action={async (formData: FormData) => {
        setError("");

        const result = await createPantryItem(formData);

        if (result?.success === false) {
          setError(result.message);
        }
      }}
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
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Item Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Rice"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
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
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Quantity
          </label>

          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            placeholder="1"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Unit
          </label>

          <select
            id="unit"
            name="unit"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="item">Item</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="litre">Litre</option>
            <option value="packet">Packet</option>
            <option value="can">Can</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="expiryDate"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Expiry Date
        </label>

        <input
          id="expiryDate"
          name="expiryDate"
          type="date"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <SubmitButton />
    </form>
  );
}