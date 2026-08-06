"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

export async function createPantryItem(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in to add pantry items.",
    };
  }

  const name = formData.get("name")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const quantityValue = formData.get("quantity")?.toString();
  const unit = formData.get("unit")?.toString().trim();
  const expirationDate = formData.get("expirationDate")?.toString();

  if (
    !name ||
    !category ||
    !quantityValue ||
    !unit ||
    !expirationDate
  ) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  const quantity = Number(quantityValue);

  if (Number.isNaN(quantity) || quantity < 1) {
    return {
      success: false,
      message: "Quantity must be at least 1.",
    };
  }

  const expiration = new Date(expirationDate);

  if (Number.isNaN(expiration.getTime())) {
    return {
      success: false,
      message: "Please provide a valid expiration date.",
    };
  }

  try {
    await connectDB();

    await PantryItem.create({
      name,
      category,
      quantity,
      unit,
      expirationDate: expiration,
      userId: session.user.id,
    });

    return {
      success: true,
      message: "Pantry item created successfully.",
    };

  } catch (error) {
    console.error("Create Pantry Item Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/pantry");
}