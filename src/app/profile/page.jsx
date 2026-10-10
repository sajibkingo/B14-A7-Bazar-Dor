"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authClient, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const router = useRouter();
    const { user, isPending } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isPending && !user) {
            toast.error("প্রোফাইল দেখতে সাইন ইন করুন", {
                toastId: "profile-auth-toast",
            });
            router.push("/signin");
        }
    }, [user, isPending, router]);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সফলভাবে লগআউট হয়েছে");
            router.push("/");
        } catch {
            toast.error("লগআউট করতে সমস্যা হয়েছে");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedName = formData.get("name")?.toString().trim();

        if (!updatedName) {
            toast.error("নামের ঘরটি পূরণ করুন");
            return;
        }

        setLoading(true);
        try {
            const res = await authClient.updateUser({
                name: updatedName,
            });

            if (res?.error) {
                toast.error(res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি");
            } else {
                toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
                router.refresh();
            }
        } catch {
            toast.error("তথ্য আপডেট করার সময় সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    if (isPending || (!user && !isPending)) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#3c7844]"></span>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4 font-sans">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    আমার প্রোফাইল
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            <div className="bg-[#fcfdfc] border border-gray-100 rounded-3xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative border border-gray-100 shrink-0 bg-gray-50">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#3c7844] text-white text-2xl font-black flex items-center justify-center">
                                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-black text-gray-900 truncate">
                            {user?.name || "ব্যবহারকারী"}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer shrink-0"
                >
                    <span>↰</span>
                    <span>সাইন আউট</span>
                </button>
            </div>

            <div className="bg-[#fcfdfc] border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <h3 className="text-base font-black text-gray-900 mb-5">তথ্য</h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            key={user?.name || "name-field"}
                            defaultValue={user?.name || ""}
                            placeholder="আপনার নাম"
                            className="w-full px-4 py-3 bg-[#fbfcfb] border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#3c7844]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#3f7d45] hover:bg-[#346a39] active:scale-[0.99] disabled:opacity-70 text-white font-bold rounded-xl text-sm shadow-[0_4px_14px_rgba(63,125,69,0.3)] transition cursor-pointer"
                    >
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
}