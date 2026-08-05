"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

export async function createPantryItem(formData: FormData) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to add pantry items.",
      };
    }

    const name = formData.get("name")?.toString().trim() ?? "";
    const category =
      formData.get("category")?.toString().trim() ?? "";
    const quantityValue =
      formData.get("quantity")?.toString() ?? "";
    const unit = formData.get("unit")?.toString().trim() ?? "item";
    const expiryDate =
      formData.get("expiryDate")?.toString() ?? "";

    const quantity = Number(quantityValue);

    // Required fields
    if (!name || !category || !quantityValue || !expiryDate) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // Validate quantity
    if (Number.isNaN(quantity) || quantity < 1) {
      return {
        success: false,
        message: "Quantity must be at least 1.",
      };
    }

    // Validate expiry date
    const expiry = new Date(expiryDate);

    if (Number.isNaN(expiry.getTime())) {
      return {
        success: false,
        message: "Please provide a valid expiry date.",
      };
    }

    await PantryItem.create({
      name,
      category,
      quantity,
      unit,
      expiryDate: expiry,
      userId: session.user.id,
    });

  } catch (error) {
    console.error("Create Pantry Item Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/pantry");
}