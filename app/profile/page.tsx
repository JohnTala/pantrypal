import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and manage your PantryPal profile information and account settings.",
};

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-green-600">
        Profile
      </h1>

      <p className="mt-2 text-slate-600">
        This page will display the User&apos;s profile information.
      </p>
    </section>
  );
}