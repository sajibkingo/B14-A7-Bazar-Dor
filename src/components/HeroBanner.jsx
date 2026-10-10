"use client";

import React from "react";
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
                {/* Left Content */}
                <div className="w-full lg:max-w-2xl flex flex-col items-start">
                    {/* Eyebrow / Date Badge */}
                    <div
                        suppressHydrationWarning
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#e2ece2] text-[#3c7844] text-xs sm:text-sm font-semibold mb-6 tracking-wide"
                    >
                        {typeof window !== "undefined"
                            ? getBengaliDate()
                            : "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1b231c] tracking-tight leading-tight mb-4">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mb-8">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                        গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Primary CTA Button */}
                    <button
                        onClick={handleScrollToProducts}
                        className="px-6 py-3 bg-[#3f7d45] hover:bg-[#346a39] active:scale-95 text-white font-bold text-sm sm:text-base rounded-xl shadow-[0_4px_14px_0_rgba(63,125,69,0.39)] transition-all duration-200 cursor-pointer"
                    >
                        সব পণ্য দেখুন
                    </button>
                </div>

                {/* Right Side Illustration Vector / Image */}
                <div className="w-full lg:w-auto flex justify-center items-center shrink-0">
                    <div className="relative w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 flex items-center justify-center">
                        {/* Soft Ellipse Shadow under basket */}
                        <div className="absolute bottom-2 w-56 sm:w-64 h-6 bg-[#000000]/10 rounded-[100%] blur-sm pointer-events-none" />

                        {/* Custom SVG Fruit & Veggie Basket Matching UI */}
                        <svg
                            viewBox="0 0 320 320"
                            className="w-full h-full drop-shadow-sm select-none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Back Green Pumpkin / Big Veggie */}
                            <g id="big-green-melon">
                                {/* Stem & Leaves */}
                                <path
                                    d="M174 72 C174 58, 185 45, 192 42"
                                    stroke="#2c6933"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M176 65 C160 55, 163 42, 174 42 C185 42, 182 56, 176 65 Z"
                                    fill="#2c6933"
                                />
                                <path
                                    d="M174 65 C190 55, 187 42, 176 42 C165 42, 168 56, 174 65 Z"
                                    fill="#2c6933"
                                />
                                {/* Melon Body */}
                                <ellipse cx="178" cy="120" rx="42" ry="46" fill="#60be6d" />
                                <ellipse cx="178" cy="120" rx="22" ry="44" fill="#6dcc7a" />
                            </g>

                            {/* Red Apple / Fruit on the left */}
                            <g id="red-apple">
                                {/* Stem & Leaf */}
                                <path
                                    d="M142 85 C147 70, 160 62, 165 60"
                                    stroke="#35683b"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M145 76 C155 70, 155 60, 146 63 Z"
                                    fill="#35683b"
                                />
                                {/* Body */}
                                <circle cx="136" cy="125" r="38" fill="#d83a3a" />
                                <ellipse cx="127" cy="115" rx="8" ry="12" fill="#e75d5d" />
                            </g>

                            {/* Purple Grape / Plum on the far left */}
                            <g id="purple-fruit">
                                <path
                                    d="M124 130 C128 118, 134 112, 136 109"
                                    stroke="#35683b"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                                <circle cx="122" cy="146" r="23" fill="#8d4ae8" />
                                <ellipse cx="116" cy="140" rx="4" ry="7" fill="#b07aff" />
                            </g>

                            {/* Orange Citrus (Middle) */}
                            <g id="orange-fruit">
                                <circle cx="160" cy="146" r="20" fill="#e86e30" />
                                <ellipse cx="155" cy="142" rx="3.5" ry="5.5" fill="#f48e58" />
                            </g>

                            {/* Yellow / Golden Citrus (Right) */}
                            <g id="yellow-fruit">
                                {/* Stem & Leaf */}
                                <path
                                    d="M208 118 C215 106, 224 103, 226 101"
                                    stroke="#35683b"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M211 110 C219 106, 219 98, 212 101 Z"
                                    fill="#35683b"
                                />
                                <circle cx="206" cy="148" r="24" fill="#e89e34" />
                                <ellipse cx="200" cy="142" rx="4.5" ry="7" fill="#f5b85d" />
                            </g>

                            {/* Woven Wooden Basket */}
                            <g id="basket">
                                {/* Basket Top Rim */}
                                <path
                                    d="M90 170 C90 167, 226 167, 226 170 L220 188 C220 188, 96 188, 96 188 Z"
                                    fill="#783e18"
                                />
                                {/* Basket Main Body Trapezoid */}
                                <path
                                    d="M94 186 L108 248 C109 253, 114 256, 120 256 L196 256 C202 256, 207 253, 208 248 L222 186 Z"
                                    fill="#99501e"
                                />
                                {/* Vertical Slats / Stripes */}
                                <line x1="112" y1="188" x2="124" y2="255" stroke="#783e18" strokeWidth="4" />
                                <line x1="134" y1="188" x2="140" y2="255" stroke="#783e18" strokeWidth="4" />
                                <line x1="158" y1="188" x2="158" y2="255" stroke="#783e18" strokeWidth="4" />
                                <line x1="182" y1="188" x2="176" y2="255" stroke="#783e18" strokeWidth="4" />
                                <line x1="204" y1="188" x2="192" y2="255" stroke="#783e18" strokeWidth="4" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}