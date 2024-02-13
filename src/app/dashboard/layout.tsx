import React from "react";
import Sidebar from "../_components/sidebar";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Topbar from "../_components/topbar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerAuthSession();
    if (!session) return redirect("/api/auth/signin");

    return (

        <main className='flex min-h-[100dvh]'>
            <Sidebar />
            <div className='w-full bg-[#f8f7fa] p-4'>
                <Topbar />
                <div className="">
                    {children}
                </div>
            </div>

        </main>
    );
}
