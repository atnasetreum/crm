import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"];
  }
}
