"use client";

import React from "react";

export default function SortDropdown({ value, onChange }) {
    return (
        <div className="relative inline-flex items-center">
            <span className="text-xs sm:text-sm font-semibold text-gray-600 mr-2.5">
                সাজান
            </span>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-9 text-xs sm:text-sm font-medium text-gray-800 shadow-sm hover:border-gray-300 focus:outline-none focus:border-[#3c7844] cursor-pointer"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="lowToHigh">দাম: কম থেকে বেশি</option>
                    <option value="highToLow">দাম: বেশি থেকে কম</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </div>
        </div>
    );
}