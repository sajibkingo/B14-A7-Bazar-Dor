"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth-client";
import { getBengaliDate } from "@/lib/utils";
import { toast } from "react-toastify";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadCategories() {
            try {
                const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
                if (!res.ok) return;
                const data = await res.json();
                const list = Array.isArray(data)
                    ? data
                    : data?.data || data?.categories || [];
                setCategories(list);
            } catch (err) {
                console.error("Categories fetch error:", err);
            }
        }

        loadCategories();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সফলভাবে লগআউট হয়েছে");
            router.push("/");
        } catch {
            toast.error("লগআউট করতে সমস্যা হয়েছে");
        }
    };

    return (
        <header className="w-full bg-[#fafbf9] border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-2xl overflow-hidden shadow-sm flex items-center justify-center bg-[#3c7844]">
                        <Image
                            src="/logo-icon.png"
                            alt="লোগো"
                            width={48}
                            height={48}
                            className="object-contain p-1"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                            বাজার দর
                        </span>
                        <span
                            suppressHydrationWarning
                            className="text-xs text-gray-500 font-medium mt-1.5"
                        >
                            {typeof window !== "undefined"
                                ? getBengaliDate()
                                : "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden relative">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#3c7844] text-white flex items-center justify-center font-bold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-gray-800 hidden sm:inline">
                                    {user.name}
                                </span>
                                <span className="text-xs text-gray-500">▼</span>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[50] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-xl w-52 border border-gray-100"
                            >
                                <li className="menu-title px-4 py-2 border-b border-gray-100">
                                    <span className="font-semibold text-gray-900">{user.name}</span>
                                    <span className="text-xs text-gray-400 lowercase">{user.email}</span>
                                </li>
                                <li>
                                    <Link href="/profile">আমার প্রোফাইল</Link>
                                </li>
                                <li>
                                    <Link href="/profile/update">তথ্য আপডেট করুন</Link>
                                </li>
                                <li>
                                    <button onClick={handleSignOut} className="text-red-600 font-semibold">
                                        লগআউট
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/signin"
                                className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-lg transition"
                            >
                                সাইন ইন
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 py-1.5 text-sm font-semibold text-white bg-[#3c7844] hover:bg-[#326438] rounded-lg shadow-sm transition"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <nav className="border-t border-gray-100 bg-[#fafbf9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6 overflow-x-auto py-2.5 no-scrollbar">
                        {categories.map((cat) => {
                            const href = `/category/${cat.id || cat.slug}`;
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={cat.id || cat.slug}
                                    href={href}
                                    className={`inline-flex items-center gap-1.5 text-sm whitespace-nowrap transition-colors ${isActive
                                            ? "text-emerald-800 font-bold"
                                            : "text-gray-700 font-medium hover:text-black"
                                        }`}
                                >
                                    <span className="text-base">{cat.icon}</span>
                                    <span>{cat.nameBn}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
}