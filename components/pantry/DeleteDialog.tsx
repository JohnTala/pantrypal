"use client";

import { useState } from "react";

interface DeleteDialogProps {
  itemId: string;
  itemName: string;
  onDeleted?: () => void;
}

export default function DeleteDialog({
  itemId,
  itemName,
  onDeleted,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      const response = await fetch(`/api/pantry/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete pantry item.");
      }

      setOpen(false);

      if (onDeleted) {
        onDeleted();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete pantry item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              Delete Pantry Item
            </h2>

            <p className="mb-6">
              Are you sure you want to delete{" "}
              <strong>{itemName}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded border px-4 py-2 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}