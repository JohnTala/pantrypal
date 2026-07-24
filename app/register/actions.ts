"use server";

import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import User from "@/models/User";

export async function registerUser(formData: FormData) {
  await connectDB();

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("All fields are required.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  redirect("/");
}