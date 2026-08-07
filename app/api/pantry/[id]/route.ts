import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { auth } from "@/auth";
import PantryItem from "@/models/PantryItem";

// GET single pantry item
export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
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

    const { id } = await context.params;

    const item = await PantryItem.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!item) {
      return NextResponse.json(
        {
          message: "Pantry item not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("GET Pantry Error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch pantry item",
      },
      {
        status: 500,
      },
    );
  }
}

// UPDATE pantry item
export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
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

    const { id } = await context.params;

    const body = await request.json();

    const updatedItem = await PantryItem.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedItem) {
      return NextResponse.json(
        {
          message: "Pantry item not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("PUT Pantry Error:", error);

    return NextResponse.json(
      {
        message: "Failed to update pantry item",
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE pantry item
export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
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

    const { id } = await context.params;

    const deletedItem = await PantryItem.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deletedItem) {
      return NextResponse.json(
        {
          message: "Pantry item not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Pantry item deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Pantry Error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete pantry item",
      },
      {
        status: 500,
      },
    );
  }
}