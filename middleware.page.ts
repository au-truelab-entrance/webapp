import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import type { NextApiRequest, NextApiResponse } from "next";

console.log("Hello");
export async function middleware(req: NextApiRequest, res: NextApiResponse) {
    console.log("Hello");
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    matcher: ["/dashboard"],
};
