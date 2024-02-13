"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { IoAnalyticsOutline, IoGridOutline, IoPeopleOutline } from "react-icons/io5";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="fbg-white h-screen w-80 p-4 top-0  hidden lg:block sticky shadow-small">
            <h1 className='font-bold text-primary text-4xl flex '>D*Code</h1>
            <div className="mt-10 w-full text-white">
                <Link className={`h-10 mt-1 cursor-pointer flex items-center rounded-lg px-4  ${pathname == "/dashboard" ? "text-white bg-primary " : "text-foreground hover:bg-black hover:bg-opacity-5 transition-background"}`} href="/dashboard">
                    <IoGridOutline size={24} />
                    <h1 className='ml-2 flex'>Overview</h1>
                </Link>
                <Link className={`h-10 mt-1 cursor-pointer flex items-center rounded-lg px-4  ${pathname == "/dashboard/students" ? "text-white bg-primary " : "text-foreground hover:bg-black hover:bg-opacity-5 transition-background"}`} href="/dashboard/students">
                    <IoPeopleOutline size={24} />
                    <h1 className='ml-2 flex'>Students</h1>
                </Link>
                <Link className={`h-10 mt-1 cursor-pointer flex items-center rounded-lg px-4  ${pathname == "/dashboard/analytics" ? "text-white bg-primary " : "text-foreground hover:bg-black hover:bg-opacity-5 transition-background"}`} href="/dashboard/analytics">
                    <IoAnalyticsOutline size={24} />
                    <h1 className='ml-2 flex'>Analytics</h1>
                </Link>
            </div>
        </div>
    );
}
