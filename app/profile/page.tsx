import type { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and manage your PantryPal profile information and account settings.",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <section className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-bold text-green-600">Profile</h1>
        <p className="mt-2 text-slate-600">
          You must be logged in to view your profile.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-green-600">Profile</h1>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Name</p>
            <p className="text-lg">{session.user.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="text-lg">{session.user.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}