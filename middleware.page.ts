import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

export default NextAuth(authOptions).auth;

console.log("Middleware running")

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};