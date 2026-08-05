import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your PantryPal account to manage your pantry items, track expiration dates, and view reminders.",
};

export default function LoginPage() {
  return (
    <main className="p-8">
      <h1>Login</h1>
    </main>
  );
}