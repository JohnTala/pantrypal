import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import PantryItem from "@/models/PantryItem";
import { hashPassword } from "@/lib/password";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("GET /api/profile error:", error);

    return NextResponse.json(
      { error: "Failed to retrieve profile" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const password = typeof body.password === "string" ? body.password : "";

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long" },
        { status: 400 },
      );
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      email,
      _id: { $ne: session.user.id },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "That email address is already in use" },
        { status: 409 },
      );
    }

    const updateData: {
      name: string;
      email: string;
      password?: string;
    } = {
      name,
      email,
    };

    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters long" },
          { status: 400 },
        );
      }

      updateData.password = await hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(session.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("PUT /api/profile error:", error);

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    await PantryItem.deleteMany({
      userId: session.user.id,
    });

    const user = await User.findByIdAndDelete(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/profile error:", error);

    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 },
    );
  }
}
