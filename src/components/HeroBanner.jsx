"use client";

import React from "react";
import Image from "next/image";
import { getBengaliDate } from "@/lib/utils";

export default function HeroBanner() {
    const handleScrollToProducts = () => {
        const target = document.getElementById("সব-পণ্য");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="w-full bg-[#f4f7f4]/80 rounded-[32px] border border-gray-100 p-8 sm:p-12 lg:p-14 mb-10 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="w-full lg:max-w-2xl flex flex-col items-start">
                    <div
                        suppressHydrationWarning
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#e2ece2] text-[#3c7844] text-xs sm:text-sm font-semibold mb-6 tracking-wide"
                    >
                        {typeof window !== "undefined"
                            ? getBengaliDate()
                            : "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1b231c] tracking-tight leading-tight mb-4">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-l mb-8">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                        গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <button
                        onClick={handleScrollToProducts}
                        className="px-6 py-3 bg-[#3f7d45] hover:bg-[#346a39] active:scale-95 text-white font-bold text-sm sm:text-base rounded-xl shadow-[0_4px_14px_0_rgba(63,125,69,0.39)] transition-all duration-200 cursor-pointer"
                    >
                        সব পণ্য দেখুন
                    </button>
                </div>

                <div className="w-full lg:w-auto flex justify-center items-center shrink-0">
                    <div className="relative w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 flex items-center justify-center">
                        <div className="absolute bottom-1 w-56 sm:w-64 h-6 bg-[#000000]/10 rounded-[100%] blur-sm pointer-events-none" />
                        <Image
                            src="/bazar-hero.png"
                            alt="বাজারের ফলের ঝুড়ি"
                            width={320}
                            height={320}
                            className="object-contain relative z-10 drop-shadow-sm select-none"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}