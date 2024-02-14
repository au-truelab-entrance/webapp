import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    return redirect("/api/auth/signin");
}
