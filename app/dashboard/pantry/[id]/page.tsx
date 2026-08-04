"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineArrowLeft } from "react-icons/hi2";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  expirationDate: string;
  createdAt: string;
}

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<PantryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockItem: PantryItem = {
        id: params.id as string,
        name: "Milk",
        quantity: 2,
        category: "Dairy",
        location: "Fridge",
        expirationDate: "2026-08-10",
        createdAt: "2026-07-25",
      };
      
      setItem(mockItem);
      setLoading(false);
    };

    fetchItem();
  }, [params.id]);

  const handleDelete = async () => {
    router.push("/dashboard/pantry");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Item not found</p>
        <Link href="/dashboard/pantry" className="text-emerald-600 hover:text-emerald-700 mt-2 inline-block">
          ← Back to Pantry
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/pantry"
          className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          <HiOutlineArrowLeft className="h-5 w-5" />
          Back to Pantry
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
          <span className="text-sm px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
            {item.category}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Quantity</span>
            <span className="font-medium">{item.quantity}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Category</span>
            <span className="font-medium">{item.category}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Location</span>
            <span className="font-medium">{item.location}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Expiration Date</span>
            <span className="font-medium">
              {new Date(item.expirationDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Added</span>
            <span className="font-medium">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link
            href={`/dashboard/pantry/${item.id}/edit`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <HiOutlinePencilSquare className="h-5 w-5" />
            Edit
          </Link>
          <button
            onClick={() => setDeleteModal(true)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <HiOutlineTrash className="h-5 w-5" />
            Delete
          </button>
        </div>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Item</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{item.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}