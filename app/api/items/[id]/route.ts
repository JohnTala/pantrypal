import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/items/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid item ID." },
        { status: 400 },
      );
    }

    const item = await PantryItem.findById(id);

    if (!item) {
      return NextResponse.json(
        { message: "Pantry item not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("GET Item Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT /api/items/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid item ID." },
        { status: 400 },
      );
    }

    const body = await request.json();

    const updatedItem = await PantryItem.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return NextResponse.json(
        { message: "Pantry item not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Pantry item updated successfully.",
      item: updatedItem,
    });
  } catch (error) {
    console.error("PUT Item Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE /api/items/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid item ID." },
        { status: 400 },
      );
    }

    const deletedItem = await PantryItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        { message: "Pantry item not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Pantry item deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Item Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
