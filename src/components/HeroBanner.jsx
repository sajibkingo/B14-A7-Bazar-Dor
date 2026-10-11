"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getBengaliDate } from "@/lib/utils";

export default function HeroBanner() {
    const handleScroll = (e) => {
        e.preventDefault();
        const element = document.getElementById("all-products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full bg-[#fcfdfc] border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
                <div className="inline-block bg-[#eef5ee] text-[#3c7844] font-semibold text-xs px-3 py-1.5 rounded-full">
                    {getBengaliDate()}
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>

                <div>
                    <a
                        href="#all-products"
                        onClick={handleScroll}
                        className="inline-block px-6 py-2.5 bg-[#3f7d45] hover:bg-[#346a39] active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-[0_4px_14px_rgba(63,125,69,0.25)] transition cursor-pointer"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>
            </div>

            <div className="w-48 h-48 sm:w-64 sm:h-64 relative shrink-0">
                <Image
                    src="/bazar-hero.png"
                    alt="বাজার ঝুড়ি"
                    fill
                    priority
                    className="object-contain"
                />
            </div>
        </div>
    );
}