import React from "react";

export default function Skeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                    <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="w-3/4 h-5 bg-gray-200 rounded-md"></div>
                <div className="w-1/3 h-4 bg-gray-200 rounded-md mt-2"></div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
                <div className="w-12 h-4 bg-gray-200 rounded-md"></div>
            </div>
        </div>
    );
}