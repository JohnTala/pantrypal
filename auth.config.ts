import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [],

  pages: {
    signIn: "/login",
  },

  callbacks: {
  authorized({ auth, request: { nextUrl } }) {
    const isLoggedIn = !!auth?.user;

    const isProtected =
      nextUrl.pathname.startsWith("/dashboard") ||
      nextUrl.pathname.startsWith("/pantry") ||
      nextUrl.pathname.startsWith("/profile") ||
      nextUrl.pathname.startsWith("/reminders");

    if (isProtected && !isLoggedIn) {
      return false;
    }

    if (
      isLoggedIn &&
      (nextUrl.pathname === "/login" ||
        nextUrl.pathname === "/register")
    ) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    return true;
  },
},
};

export default authConfig;