import React from "react";
import Sidebar from "../_components/sidebar";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerAuthSession();
    if (!session) return redirect("/api/auth/signin");

    return (
        <main className="flex">
            <Sidebar />
            <div className="w-full p-6">{children}</div>
        </main>
    );
}
