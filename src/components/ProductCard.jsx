"use client";

import React from "react";
import Link from "next/link";
import { formatBengaliPrice, toBengaliNumber, parseNumericValue } from "@/lib/utils";

const UNIT_MAP = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gm: "গ্রাম",
    gram: "গ্রাম",
};

export default function ProductCard({ product }) {
    if (!product) return null;

    const rawPrice =
        product.price ??
        product.todayPrice ??
        product.today_price ??
        product.currentPrice ??
        product.current_price ??
        0;

    const rawChange =
        product.change ??
        product.changePercent ??
        product.change_percent ??
        product.priceChange ??
        product.price_change ??
        0;

    const numChange = parseNumericValue(rawChange);
    const isUp = numChange > 0;
    const isDown = numChange < 0;

    const badgeStyle = isUp
        ? "bg-[#fdf0ed] text-[#d32f2f]"
        : isDown
            ? "bg-[#edf7ed] text-[#2e7d32]"
            : "bg-[#f4f5f4] text-gray-500";

    const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";
    const formattedPercent = isUp || isDown
        ? toBengaliNumber(Math.abs(numChange).toFixed(1))
        : "০.০";

    let rawUnit = product.unit || product.unit_bn || "কেজি";
    rawUnit = String(rawUnit).trim();
    const cleanUnitKey = rawUnit.replace(/^প্রতি\s*/, "").toLowerCase();
    const unitName = UNIT_MAP[cleanUnitKey] || rawUnit.replace(/^প্রতি\s*/, "");
    const displayUnit = `প্রতি ${unitName}`;

    const title = product.name || product.name_bn || product.title || "পণ্য";
    const id = product.id ?? product.slug;
    const emoji = product.emoji || product.icon || "🍚";

    return (
        <Link
            href={`/product/${id}`}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col justify-between"
        >
            <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#f6f8f6] flex items-center justify-center text-2xl shrink-0">
                    {emoji}
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base leading-snug truncate">
                        {title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {displayUnit}
                    </p>
                </div>
            </div>

            <div className="flex items-end justify-between mt-6 pt-1">
                <div>
                    <span className="text-xs text-gray-400 block font-normal">
                        আজকের দাম
                    </span>
                    <span className="text-xl font-black text-gray-900 leading-none mt-1 inline-block">
                        {formatBengaliPrice(rawPrice)} টাকা
                    </span>
                </div>

                <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${badgeStyle}`}
                >
                    <span>{changeSymbol}</span>
                    <span>{formattedPercent}%</span>
                </span>
            </div>
        </Link>
    );
}