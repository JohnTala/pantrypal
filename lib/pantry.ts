import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

export async function getUserPantryItems(userId: string) {
  await connectDB();

  const items = await PantryItem.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return items.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    unit: item.unit,
    expiryDate: item.expiryDate.toISOString(),
    createdAt: item.createdAt.toISOString(),
  }));
}