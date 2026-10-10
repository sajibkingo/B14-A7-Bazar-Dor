import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#fafbf9] border-t border-gray-200 mt-auto py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600 font-medium text-center md:text-left">
                <div>
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </div>
                <div>
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </div>
            </div>
        </footer>
    );
}