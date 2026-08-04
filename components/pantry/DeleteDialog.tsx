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
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete pantry item.");
      }

      alert(`${itemName} deleted successfully.`);

      setOpen(false);

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete pantry item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Delete Pantry Item</h2>

            <p className="mb-6">
              Are you sure you want to delete <strong>{itemName}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
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
