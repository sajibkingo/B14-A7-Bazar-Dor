"use client";

import React from "react";
import Link from "next/link";
import { formatBengaliPrice, toBengaliNumber } from "@/lib/utils";

export default function PriceTicker({ products = [] }) {
    if (!products || products.length === 0) return null;

    const displayItems = [...products, ...products];

    return (
        <div className="w-full bg-[#1b241d] text-white overflow-hidden py-2 border-b border-gray-800 select-none">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {displayItems.map((item, index) => {
                    const change = item.change ?? item.priceChange ?? 0;
                    const isUp = change > 0;
                    const isDown = change < 0;

                    const changeBadgeColor = isUp
                        ? "text-emerald-400"
                        : isDown
                            ? "text-rose-400"
                            : "text-gray-400";

                    const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";
                    const formattedChange = toBengaliNumber(Math.abs(change).toFixed(1));
                    const unit = item.unit || "কেজি";

                    return (
                        <Link
                            key={`${item.id || item.slug || index}-${index}`}
                            href={`/product/${item.id || item.slug}`}
                            className="inline-flex items-center gap-2 mx-5 text-xs sm:text-sm font-medium hover:text-emerald-300 transition shrink-0"
                        >
                            <span>{item.emoji || "📦"}</span>
                            <span className="text-gray-200">{item.name || item.title}</span>
                            <span className="text-gray-400 font-normal">
                                {formatBengaliPrice(item.price || item.currentPrice)} টাকা/{unit}
                            </span>
                            <span className={`inline-flex items-center text-xs font-semibold ${changeBadgeColor}`}>
                                {changeSymbol} {formattedChange}%
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}