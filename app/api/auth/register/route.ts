import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, email, password }: RegisterRequest = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json<RegisterResponse>(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json<RegisterResponse>(
        { message: "Email already exists." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json<RegisterResponse>(
      {
        message: "Registration successful.",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration Error:", error);

    return NextResponse.json<RegisterResponse>(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
