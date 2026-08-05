import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { auth } from "@/auth";
import PantryItem from "@/models/PantryItem";


// GET all pantry items for logged-in user
export async function GET() {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
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
      {
        message: "Failed to fetch pantry items",
      },
      {
        status: 500,
      },
    );
  }
}


// CREATE pantry item
export async function POST(
  request: NextRequest,
) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }


    const body = await request.json();

    const {
      name,
      category,
      quantity,
      unit,
      expiryDate,
    } = body;


    if (
      !name ||
      !category ||
      !quantity ||
      !expiryDate
    ) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        {
          status: 400,
        },
      );
    }


    const item = await PantryItem.create({
      name,
      category,
      quantity,
      unit: unit || "item",
      expiryDate,
      userId: session.user.id,
    });


    return NextResponse.json(
      item,
      {
        status: 201,
      },
    );


  } catch (error) {
    console.error("POST Pantry Error:", error);

    return NextResponse.json(
      {
        message: "Failed to create pantry item",
      },
      {
        status: 500,
      },
    );
  }
}