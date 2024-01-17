"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="flex h-screen w-64 flex-col items-center bg-primary p-4">
            <div className="mt-10 text-2xl font-bold text-white">TRUELAB</div>
            <div className="mt-10 w-full text-white">
                <Link
                    className={`${
                        pathname === "/dashboard" && "bg-white text-primary"
                    } flex h-14  items-center rounded-xl p-2`}
                    href="/dashboard"
                >
                    Dashboard
                </Link>
                <Link
                    className={`${
                        pathname === "/dashboard/students" &&
                        "bg-white text-primary"
                    } flex h-14 items-center rounded-xl p-2`}
                    href="/dashboard/students"
                >
                    Students
                </Link>
                <Link
                    className={`${
                        pathname === "/dashboard/analytics" &&
                        "bg-white text-primary"
                    } flex h-14 items-center rounded-xl p-2`}
                    href="/dashboard/analytics"
                >
                    Analytics
                </Link>
            </div>
        </div>
    );
}
