// app/dashboard/pantry/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  HiOutlinePlus, 
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineXMark,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi2";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  location: string;
  expirationDate: string;
  createdAt: string;
}

export default function PantryPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState<PantryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; itemId: string | null }>({
    isOpen: false,
    itemId: null,
  });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const mockItems: PantryItem[] = [
        {
          id: "1",
          name: "Milk",
          quantity: 2,
          category: "Dairy",
          location: "Fridge",
          expirationDate: "2026-08-10",
          createdAt: "2026-07-25",
        },
        {
          id: "2",
          name: "Eggs",
          quantity: 12,
          category: "Dairy",
          location: "Fridge",
          expirationDate: "2026-08-15",
          createdAt: "2026-07-28",
        },
        {
          id: "3",
          name: "Bread",
          quantity: 1,
          category: "Bakery",
          location: "Pantry",
          expirationDate: "2026-08-05",
          createdAt: "2026-07-30",
        },
        {
          id: "4",
          name: "Chicken Breast",
          quantity: 3,
          category: "Meat",
          location: "Freezer",
          expirationDate: "2026-09-01",
          createdAt: "2026-07-20",
        },
        {
          id: "5",
          name: "Apples",
          quantity: 6,
          category: "Produce",
          location: "Pantry",
          expirationDate: "2026-08-12",
          createdAt: "2026-07-29",
        },
        {
          id: "6",
          name: "Rice",
          quantity: 2,
          category: "Grains",
          location: "Pantry",
          expirationDate: "2027-01-01",
          createdAt: "2026-07-15",
        },
        {
          id: "7",
          name: "Pasta",
          quantity: 3,
          category: "Grains",
          location: "Pantry",
          expirationDate: "2026-12-31",
          createdAt: "2026-07-22",
        },
        {
          id: "8",
          name: "Tomatoes",
          quantity: 4,
          category: "Produce",
          location: "Pantry",
          expirationDate: "2026-08-08",
          createdAt: "2026-08-01",
        },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setItems(mockItems);
      setFilteredItems(mockItems);
      setLoading(false);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    let filtered = [...items];

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter(item => item.location === selectedLocation);
    }

    setFilteredItems(filtered);
  }, [items, searchQuery, selectedCategory, selectedLocation]);

  const categories = [...new Set(items.map(item => item.category))];
  const locations = [...new Set(items.map(item => item.location))];

  const handleDelete = async (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setDeleteModal({ isOpen: false, itemId: null });
  };

  const getExpirationStatus = (date: string) => {
    const today = new Date();
    const expDate = new Date(date);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: "expired", label: "Expired", color: "text-red-600 bg-red-50" };
    if (diffDays <= 3) return { status: "expiring-soon", label: "Expiring Soon", color: "text-amber-600 bg-amber-50" };
    return { status: "good", label: "Good", color: "text-emerald-600 bg-emerald-50" };
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("all");
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your pantry items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Pantry</h1>
          <p className="text-gray-600 text-sm">
            {filteredItems.length} items in your pantry
          </p>
        </div>
        <Link
          href="/dashboard/pantry/new"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto whitespace-nowrap"
        >
          <HiOutlinePlus className="h-5 w-5" />
          Add Item
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 min-w-0 relative">
          <input
            type="text"
            placeholder="Search items..."
            defaultValue={searchQuery}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <HiOutlineFunnel className="h-5 w-5" />
            <span className="hidden sm:inline">Filters</span>
            {(selectedCategory !== "all" || selectedLocation !== "all") && (
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            )}
          </button>
          {(selectedCategory !== "all" || selectedLocation !== "all" || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <HiOutlineXMark className="h-5 w-5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600 mb-4">
            {items.length === 0 
              ? "Your pantry is empty. Start adding items!" 
              : "Try adjusting your search or filters"}
          </p>
          {items.length === 0 && (
            <Link
              href="/dashboard/pantry/new"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
            >
              Add Your First Item
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const expStatus = getExpirationStatus(item.expirationDate);
            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      Qty: {item.quantity} • {item.category}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${expStatus.color}`}>
                    {expStatus.label}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <p className="truncate">📍 {item.location}</p>
                  <p className="truncate">📅 Expires: {new Date(item.expirationDate).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  <Link
                    href={`/dashboard/pantry/${item.id}`}
                    className="flex-1 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <HiOutlineEye className="h-4 w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">View</span>
                  </Link>
                  <Link
                    href={`/dashboard/pantry/${item.id}/edit`}
                    className="flex-1 px-2 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <HiOutlinePencilSquare className="h-4 w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ isOpen: true, itemId: item.id })}
                    className="flex-1 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <HiOutlineTrash className="h-4 w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Item</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal({ isOpen: false, itemId: null })}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteModal.itemId && handleDelete(deleteModal.itemId)}
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