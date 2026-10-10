"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth-client";
import { getBengaliDate } from "@/lib/utils";
import { toast } from "react-toastify";

const DEFAULT_CATEGORIES = [
    { id: "chal", name: "চাল", icon: "🍚" },
    { id: "dal", name: "ডাল", icon: "🫘" },
    { id: "oil", name: "তেল", icon: "🛢️" },
    { id: "sobji", name: "সবজি", icon: "🥬" },
    { id: "mach", name: "মাছ", icon: "🐟" },
    { id: "mangsho", name: "মাংস", icon: "🍗" },
    { id: "dim-dudh", name: "ডিম-দুধ", icon: "🥛" },
    { id: "moshla", name: "মসলা", icon: "🌶️" },
];

export default function Navbar({ initialCategories = [] }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সফলভাবে লগআউট হয়েছে");
            router.push("/");
        } catch {
            toast.error("লগআউট করতে সমস্যা হয়েছে");
        }
    };

    const categories =
        initialCategories && initialCategories.length > 0
            ? initialCategories.map((cat) => {
                const matched = DEFAULT_CATEGORIES.find(
                    (c) =>
                        c.id === (cat.id || cat.slug) ||
                        c.name === (cat.name || cat.title)
                );
                return {
                    id: cat.id || cat.slug || cat.name,
                    name: cat.name || cat.title,
                    icon: cat.icon || matched?.icon || "🛒",
                };
            })
            : DEFAULT_CATEGORIES;

    return (
        <header className="w-full bg-base-100 border-b border-base-300 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#3c7844] rounded-2xl flex items-center justify-center text-white text-2xl shadow-sm">
                        🛒
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-neutral tracking-tight leading-none">
                            বাজার দর
                        </span>
                        <span
                            suppressHydrationWarning
                            className="text-xs text-base-content/70 font-medium mt-1"
                        >
                            {typeof window !== "undefined"
                                ? getBengaliDate()
                                : "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-2">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full border border-base-300">
                                    {user.image ? (
                                        <img src={user.image} alt={user.name || "User"} />
                                    ) : (
                                        <div className="w-full h-full bg-[#3c7844] text-white flex items-center justify-center font-bold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
                            >
                                <li className="menu-title px-4 py-2 border-b border-base-200">
                                    <span className="font-semibold text-neutral">{user.name}</span>
                                    <span className="text-xs text-base-content/60 lowercase">
                                        {user.email}
                                    </span>
                                </li>
                                <li>
                                    <Link href="/profile">আমার প্রোফাইল</Link>
                                </li>
                                <li>
                                    <Link href="/profile/update">তথ্য আপডেট করুন</Link>
                                </li>
                                <li>
                                    <button onClick={handleSignOut} className="text-error">
                                        লগআউট
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                                সাইন ইন
                            </Link>
                            <Link
                                href="/signup"
                                className="btn btn-sm sm:btn-md bg-[#3c7844] hover:bg-[#326438] text-white border-none"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <nav className="border-t border-base-200 bg-base-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
                        {categories.map((cat) => {
                            const href = `/category/${cat.id}`;
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={cat.id}
                                    href={href}
                                    className={`btn btn-sm whitespace-nowrap ${isActive
                                            ? "btn-active bg-emerald-50 text-emerald-800 border-emerald-300"
                                            : "btn-ghost"
                                        }`}
                                >
                                    <span className="text-base">{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
}