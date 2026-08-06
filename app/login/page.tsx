
import LoginForm from "@/components/auth/LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your PantryPal account to manage your pantry items, track expiration dates, and view reminders.",
};

export default function LoginPage() {

  return (
    <main className="flex items-center justify-center min-h-screen p-6">
      <LoginForm />
    </main>
  );
}

