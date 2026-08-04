import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
};

export default authConfig;
