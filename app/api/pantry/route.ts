import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

// GET all pantry items
export async function GET() {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const items = await PantryItem.find({
      userId: session.user.id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET Pantry Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch pantry items" },
      { status: 500 }
    );
  }
}

// CREATE pantry item
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      name,
      category,
      quantity,
      unit,
      expirationDate,
    } = body;

    if (
      !name ||
      !category ||
      !quantity ||
      !expirationDate
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = await PantryItem.create({
      name,
      category,
      quantity,
      unit: unit || "pcs",
      expirationDate,
      userId: session.user.id,
    });

    return NextResponse.json(item, {
      status: 201,
    });
  } catch (error) {
    console.error("POST Pantry Error:", error);

    return NextResponse.json(
      { message: "Failed to create pantry item" },
      { status: 500 }
    );
  }
}