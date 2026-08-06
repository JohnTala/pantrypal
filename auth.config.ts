import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Protect dashboard routes
      const isProtected =
        nextUrl.pathname.startsWith("/dashboard");

      if (isProtected) {
        return isLoggedIn;
      }

      // Prevent authenticated users from visiting the login page
      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(
          new URL("/dashboard", nextUrl)
        );
      }

      return true;
    },
  },
};

export default authConfig;