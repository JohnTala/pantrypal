"use client";

import { FormEvent, useState } from "react";
import { signOut } from "next-auth/react";

type ProfileFormProps = {
  initialName: string;
  initialEmail: string;
};

export default function ProfileForm({
  initialName,
  initialEmail,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update profile.");
        return;
      }

      setName(data.user.name);
      setEmail(data.user.email);
      setPassword("");
      setMessage("Profile updated successfully.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This will also delete all of your pantry items. This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");
    setDeleting(true);

    try {
      const response = await fetch("/api/profile", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete account.");
        return;
      }

      await signOut({ callbackUrl: "/login" });
    } catch {
      setError("Something went wrong. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-slate-900">
          Account information
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              New password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              placeholder="Leave blank to keep your current password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
            />

            <p className="mt-1 text-sm text-slate-500">
              Only enter a password if you want to change it.
            </p>
          </div>
        </div>

        {message && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>

      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-xl font-semibold text-red-900">Delete account</h2>

        <p className="mt-2 text-sm text-red-800">
          Deleting your account will permanently remove your account and all
          pantry items associated with it.
        </p>

        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="mt-4 rounded-lg bg-red-700 px-5 py-2.5 font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "Delete my account"}
        </button>
      </div>
    </div>
  );
}
