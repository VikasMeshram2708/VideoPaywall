/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prismaInstance";
import bcrypt from "bcryptjs";
import "next-auth";
import "next-auth/jwt";

export default {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/user/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Type Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type Password",
        },
      },
      authorize: async (credentials): Promise<User | null> => {
        // Validate credentials input
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid input: Email and password are required.");
        }

        try {
          // Find user by email with proper error handling
          const userExist = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // Check if user exists
          if (!userExist) {
            throw new Error("User not found. Please check your email.");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            userExist.password
          );

          if (!isPasswordValid) {
            throw new Error("Incorrect password. Please try again.");
          }

          // Return user object for session
          return {
            id: userExist.id,
            createdAt: userExist.createdAt,
            updatedAt: userExist.updatedAt,
            name: userExist.name,
            email: userExist.email,
            password: userExist.password,
            emailVerified: userExist.emailVerified,
            image: userExist.image,
          };
        } catch (error) {
          // Log the error for debugging
          console.error("Authentication error:", error);

          // Rethrow with a user-friendly message
          throw new Error(
            error instanceof Error
              ? error.message
              : "Authentication failed. Please try again."
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Add user ID to token on initial sign-in
      if (user) {
        token.id = user.id as string;
        token.name = user.name;
        token.email = user.email;
        // @ts-ignore
        token.isPrime = user.isPrime;
      }

      // Handle session updates
      if (trigger === "update") {
        // You can add logic to update token here if needed
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      // Add user details to session
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isPrime = token.isPrime as boolean;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      // Optional: Log successful sign-ins
      console.log("User signed in", message.user);
    },
  },
} satisfies NextAuthConfig;

// Extend session types (in next-auth.d.ts)
import { DefaultSession } from "next-auth";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isPrime: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isPrime: boolean;
  }
}
