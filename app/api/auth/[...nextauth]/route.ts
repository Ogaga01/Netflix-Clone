import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // check if we have credentials or not.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required.");
        }
        // Find the user using email from in our data base.
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // Check if the user exists.
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist.");
        }
        // Check if the password the user entered is correct, if so return user.
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password.");
        }
        return user;
      },
    }),
  ],
  // Our auth page.
  pages: {
    signIn: "/Auth",
  },
  // Turns on needed logs and errors in terminal when developing.
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
