"use client";

export default function LoginForm() {
  return (
    <form className="space-y-5 rounded-xl bg-white p-6 shadow-md">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
      >
        Login
      </button>

      <p className="text-center text-sm text-slate-500">
        Login functionality will be connected soon.
      </p>
    </form>
  );
}