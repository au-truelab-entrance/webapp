import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
// import AzureADProvider from "next-auth/providers/azure-ad";

import { env } from "~/env";
import { db } from "~/server/db";

import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "~/trpc/server";
import { User, UserRole } from "~/app/lib/definitions";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
    type UserRole = "admin" | "user";
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            role: UserRole;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        role: UserRole;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId;
            }
            return token;
        },

        // async signIn({ user, account, profile, email, credentials }) {
        //     console.log("hello")

        //     if (await api.user.getUser.query({
        //         name: credentials?.username,
        //         password: credentials?.password,
        //     })) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        //   },

        // async session({ session, token, user }) {
        //     session.user.id = token.userId;
        //     return session;
        // },
    },
    //   pages: {
    //     signIn: '/signin', //(4) custom signin page path
    //   },
    // callbacks: {
    //     session: ({ session, user }) => ({
    //         ...session,
    //         user: {
    //             ...session.user,
    //             id: user.id,
    //             role: user.role,
    //         },
    //     }),
    // },
    adapter: PrismaAdapter(db),
    providers: [
        // AzureADProvider({
        //     clientId: env.AZURE_AD_CLIENT_ID ?? "",
        //     clientSecret: env.AZURE_AD_CLIENT_SECRET ?? "",
        //     tenantId: env.AZURE_AD_TENANT_ID,
        // }),

        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, _req) => {
                // const user = {name: "J Smith", email: "jsmith@example.com" }
                if (credentials === undefined) return null;
                const user = await api.user.getUser.query({
                    name: credentials.username,
                    password: credentials.password,
                });

                if (user) {
                    const mappedUser: User = {
                        id: user.id,
                        name: user.name,
                        role: user.role as UserRole,
                    };
                    return mappedUser;
                } else {
                    return null;
                }
            },
        }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
