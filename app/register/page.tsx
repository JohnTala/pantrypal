import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-600">
            Create Your PantryPal Account
          </h1>

          <p className="mt-2 text-slate-600">
            Register to start organizing your pantry.
          </p>
        </div>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}