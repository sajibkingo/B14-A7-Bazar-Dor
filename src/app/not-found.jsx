import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-sans">
            <div className="w-20 h-20 bg-[#edf7ed] rounded-3xl flex items-center justify-center text-4xl mb-4 border border-[#d2ead2]">
                🛒
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                পৃষ্ঠাটি পাওয়া যায়নি
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
                আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি ভুল। সঠিক লিংক ব্যবহার করে আবার চেষ্টা করুন।
            </p>
            <Link
                href="/"
                className="px-6 py-2.5 bg-[#3c7844] hover:bg-[#326438] active:scale-95 text-white font-bold rounded-xl text-sm transition-all shadow-[0_4px_14px_rgba(60,120,68,0.25)]"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}