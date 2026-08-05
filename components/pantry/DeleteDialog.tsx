"use client";

import { useState } from "react";

interface DeleteDialogProps {
  id: string;
  itemName: string;
}

export default function DeleteDialog({
  id,
  itemName,
}: DeleteDialogProps) {

  const [loading, setLoading] = useState(false);


  async function deleteItem() {
    const confirmed = confirm(
      `Delete ${itemName}?`,
    );

    if (!confirmed) return;


    try {
      setLoading(true);

      await fetch(`/api/pantry/${id}`, {
        method: "DELETE",
      });


      window.location.reload();

    } catch (error) {
      console.error(
        "Delete error:",
        error,
      );

    } finally {
      setLoading(false);
    }
  }


  return (
    <button
      onClick={deleteItem}
      disabled={loading}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}