import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as authService from "../../../services/auth.service";

export const authOptions = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    cookie: {
      secure: process.env.NODE_ENV === "production", // secure cookie in production (HTTPS)
      sameSite: "lax", // CSRF protection
      path: "/",
      httpOnly: true,
    },
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // @ts-ignore
    async session({ session, token, user, profile }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token;
      console.log("session is called .......");
      return session;
    },
    // @ts-ignore
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      // @ts-ignore
      async authorize(credentials: { email: string; password: string }) {
        if (!credentials) return;
        try {
          const user = await authService.login(credentials);
          if (
            //@ts-ignore
            user.message === "invalid email" ||
            //@ts-ignore
            user.message === "invalid password"
          )
            return null;
          return user;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    singOut: "/",
  },
};
// @ts-ignore
export default NextAuth(authOptions);
