"use server";

import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";
import User from "@/models/User";

export async function registerUser(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword =
      formData.get("confirmPassword")?.toString() ?? "";

    // Check required fields
    if (!name || !email || !password || !confirmPassword) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // Confirm passwords match
    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match.",
      };
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

  } catch (error: unknown) {
    console.error("Registration Error:", error);

    // Handle MongoDB duplicate email error
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Handle Mongoose validation errors
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "ValidationError"
    ) {
      return {
        success: false,
        message: "Please check your information and try again.",
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }

  redirect("/login");
}