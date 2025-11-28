import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcrypt";

// ------------------------------------------------------
// 🔵 Module Augmentation (extends default NextAuth types)
// ------------------------------------------------------
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      location?: string | null; // ✅ Add these
      phoneNumber?: string | null; // ✅ Add these
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    createdAt?: Date;
    location?: string | null; // ✅ Add these
    phoneNumber?: string | null; // ✅ Add these
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    createdAt?: string;
    location?: string | null; // ✅ Add these
    phoneNumber?: string | null; // ✅ Add these
  }
}

// ------------------------------------------------------
// 🔵 NextAuth Options
// ------------------------------------------------------
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Find user with createdAt
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            fullName: true,
            password: true,
            location: true,
            phoneNumber: true,
            createdAt: true,
          },
        });

        if (!user || !user.password) return null;

        // Compare passwords
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        // Return user data including createdAt
        return {
          id: user.id,
          email: user.email,
          name: user.fullName ?? "",
          createdAt: user.createdAt,
          location: user.location,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, add user data to token
      if (user) {
        token.id = user.id;
        token.createdAt = user.createdAt?.toISOString();
        token.location = user.location; // ✅ Add to token
        token.phoneNumber = user.phoneNumber; // ✅ Add to token
      }

      return token;
    },

    async session({ session, token }) {
      // Add token data to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.createdAt = token.createdAt as string;
        session.user.location = token.location; // ✅ Add to session
        session.user.phoneNumber = token.phoneNumber; // ✅ Add to session
      }
      return session;
    },
  },
};