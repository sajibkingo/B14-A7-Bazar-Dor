import React from "react";

export default function Skeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] animate-pulse flex flex-col justify-between">
            <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
            <div className="flex items-end justify-between mt-6 pt-1">
                <div className="space-y-1.5">
                    <div className="h-2.5 bg-gray-200 rounded w-12"></div>
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
            </div>
        </div>
    );
}