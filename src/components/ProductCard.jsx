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
    "প্রতি কেজি": "কেজি",
    "প্রতি লিটার": "লিটার",
    "প্রতি ডজন": "ডজন",
    "প্রতি পিস": "পিস",
};

export default function ProductCard({ product }) {
    if (!product) return null;

    const rawPrice =
        product.price ??
        product.todayPrice ??
        product.today_price ??
        product.currentPrice ??
        0;

    const rawChange =
        product.change ??
        product.changePercent ??
        product.change_percent ??
        product.priceChange ??
        0;

    const numChange = parseNumericValue(rawChange);
    const isUp = numChange > 0;
    const isDown = numChange < 0;

    const changeBadgeBg = isUp
        ? "bg-rose-50 text-[#c23b38] border-rose-200"
        : isDown
            ? "bg-emerald-50 text-[#2e7d32] border-emerald-200"
            : "bg-gray-100 text-gray-600 border-gray-200";

    const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";
    const formattedChange = toBengaliNumber(Math.abs(numChange).toFixed(1));

    const rawUnit = product.unit || product.unit_bn || "কেজি";
    const unitClean = String(rawUnit).trim().toLowerCase();
    const unit = UNIT_MAP[unitClean] || String(rawUnit).replace("প্রতি ", "");

    const title = product.name || product.name_bn || product.title || "পণ্য";
    const id = product.id || product.slug;
    const emoji = product.emoji || product.icon || "🍚";

    return (
        <Link
            href={`/product/${id}`}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-emerald-500 hover:shadow-lg transition duration-200 flex flex-col justify-between group"
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gray-50 group-hover:bg-emerald-50/50 rounded-xl flex items-center justify-center text-3xl transition">
                        {emoji}
                    </div>
                    <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${changeBadgeBg}`}
                    >
                        <span>{changeSymbol}</span>
                        <span>{formattedChange}%</span>
                    </span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition line-clamp-1">
                    {title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">প্রতি {unit}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                    <span className="text-xs text-gray-400 block font-medium">আজকের দাম</span>
                    <span className="text-lg font-black text-gray-900">
                        {formatBengaliPrice(rawPrice)} টাকা
                    </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
                    বিস্তারিত →
                </span>
            </div>
        </Link>
    );
}