"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
    IoAnalyticsOutline,
    IoGridOutline,
    IoPeopleOutline,
    IoLogOutOutline,
} from "react-icons/io5";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="fbg-white sticky top-0 hidden h-screen  w-80 shadow-small lg:block">
            <h1 className="align-center text-d-code flex justify-center border-b border-solid border-[#E2E4EA] p-7 text-4xl font-bold text-primary">
                D*CODE
            </h1>
            <div className="mt-5 w-full p-4 text-white">
                <Link
                    className={`mt-1 flex h-10 cursor-pointer items-center rounded-lg px-4  ${
                        pathname == "/dashboard"
                            ? "bg-primary text-white "
                            : "text-foreground transition-background hover:bg-black hover:bg-opacity-5"
                    }`}
                    href="/dashboard"
                >
                    <IoGridOutline size={24} />
                    <h1 className="ml-2 flex">Overview</h1>
                </Link>
                <Link
                    className={`mt-1 flex h-10 cursor-pointer items-center rounded-lg px-4  ${
                        pathname == "/dashboard/students"
                            ? "bg-primary text-white "
                            : "text-foreground transition-background hover:bg-black hover:bg-opacity-5"
                    }`}
                    href="/dashboard/students"
                >
                    <IoPeopleOutline size={24} />
                    <h1 className="ml-2 flex">Students</h1>
                </Link>
                <Link
                    className={`mt-1 flex h-10 cursor-pointer items-center rounded-lg px-4  ${
                        pathname == "/dashboard/analytics"
                            ? "bg-primary text-white "
                            : "text-foreground transition-background hover:bg-black hover:bg-opacity-5"
                    }`}
                    href="/dashboard/analytics"
                >
                    <IoAnalyticsOutline size={24} />
                    <h1 className="ml-2 flex">Analytics</h1>
                </Link>
                <Link
                    className={`mt-1 flex h-10 cursor-pointer items-center rounded-lg px-4  ${
                        pathname == "/api/auth/signout"
                            ? "bg-primary text-white "
                            : "text-foreground transition-background hover:bg-black hover:bg-opacity-5"
                    }`}
                    href="/api/auth/signout"
                >
                    <IoLogOutOutline size={24} />
                    <h1 className="ml-2 flex">Log out</h1>
                </Link>
            </div>
        </div>
    );
}
