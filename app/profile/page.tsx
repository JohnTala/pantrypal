import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and manage your PantryPal profile information and account settings.",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <section className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-green-800">Profile</h1>

      <p className="mt-2 text-slate-600">
        Manage your PantryPal account information and settings.
      </p>

      <ProfileForm
        initialName={session.user.name ?? ""}
        initialEmail={session.user.email ?? ""}
      />
    </section>
  );
}
