"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    category: "",
    location: "",
    expirationDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Dairy",
    "Meat",
    "Produce",
    "Grains",
    "Canned Goods",
    "Bakery",
    "Frozen",
    "Spices",
    "Snacks",
    "Beverages",
    "Other",
  ];

  const locations = [
    "Pantry",
    "Fridge",
    "Freezer",
    "Cabinet",
    "Counter",
    "Other",
  ];

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFormData({
        name: "Milk",
        quantity: 2,
        category: "Dairy",
        location: "Fridge",
        expirationDate: "2026-08-10",
      });
      setLoading(false);
    };

    fetchItem();
  }, [params.id]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Item name is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    if (!formData.expirationDate) {
      newErrors.expirationDate = "Expiration date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    router.push(`/dashboard/pantry/${params.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/dashboard/pantry/${params.id}`}
          className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          ← Back to Item
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            {errors.location && (
              <p className="text-sm text-red-600 mt-1">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date *
            </label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition ${
                errors.expirationDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.expirationDate && (
              <p className="text-sm text-red-600 mt-1">{errors.expirationDate}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href={`/dashboard/pantry/${params.id}`}
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}