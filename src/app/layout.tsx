import "~/styles/globals.css";

import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

// Fix Dynamic server usage: Page couldn't be rendered statically because it used `cookies` at build.
export const dynamic = "force-dynamic";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "AU - Entrance",
    description:
        "Assumption University TrueLab Access: QR Code-Based Entry Management System",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`font-sans ${inter.variable}`}>
                <TRPCReactProvider cookies={cookies().toString()}>
                    <Providers>{children}</Providers>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
