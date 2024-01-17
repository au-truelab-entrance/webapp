'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <div className='flex flex-col h-screen w-64 bg-primary items-center p-4'>
            <div className="mt-10 text-2xl font-bold text-white">
                TRUELAB
            </div>
            <div className="w-full mt-10 text-white">
                <Link className={`${pathname === "/dashboard" && "bg-white text-primary"} p-2 rounded-xl  h-14 flex items-center`} href='/dashboard'>
                    Dashboard
                </Link>
                <Link className={`${pathname === "/dashboard/students" && "bg-white text-primary"} p-2 rounded-xl h-14 flex items-center`} href='/dashboard/students'>
                    Students
                </Link>
            </div>


        </div>
    )
}
