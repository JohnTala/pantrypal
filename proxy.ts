
export { auth as proxy } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pantry/:path*",
    "/profile/:path*",
    "/reminders/:path*",
  ],
};