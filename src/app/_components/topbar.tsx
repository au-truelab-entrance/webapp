"use client";

import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type Props = NonNullable<unknown>;

export default function Topbar({}: Props) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Navbar maxWidth="full" className=" top-4 rounded-md shadow-small">
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden"
            />
            <NavbarContent className="flex gap-4 font-bold">
                <NavbarItem>
                    {pathname == "/dashboard" && (
                        <div className=" flex items-center gap-2">Overview</div>
                    )}
                    {pathname == "/dashboard/students" && (
                        <div className=" flex items-center gap-2">Students</div>
                    )}
                    {pathname == "/dashboard/analytics" && (
                        <div className="flex items-center gap-2">Analytics</div>
                    )}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="bg-[#f8f7fa]">
                <NavbarMenuItem className="mt-6">
                    <Link
                        color="primary"
                        className={`${
                            pathname == "/dashboard" && "font-bold"
                        } w-full`}
                        href="/dashboard"
                        size="lg"
                    >
                        Overview
                    </Link>
                    <Link
                        color="primary"
                        className={`${
                            pathname == "/dashboard/students" && "font-bold"
                        } w-full`}
                        href="/dashboard/students"
                        size="lg"
                    >
                        Students
                    </Link>
                    <Link
                        color="primary"
                        className={`${
                            pathname == "/dashboard/analytics" && "font-bold"
                        } w-full`}
                        href="/dashboard/analytics"
                        size="lg"
                    >
                        Analytics
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
