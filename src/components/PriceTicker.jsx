"use client";

import React, { useState, useEffect } from "react";
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

export default function PriceTicker() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchTickerData() {
            try {
                const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
                if (!res.ok) return;
                const data = await res.json();
                const list = Array.isArray(data)
                    ? data
                    : data?.data || data?.products || [];
                setItems(list);
            } catch (err) {
                console.error("Ticker fetch failed:", err);
            }
        }

        fetchTickerData();
    }, []);

    if (!items || items.length === 0) return null;

    const displayItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-white border-b border-gray-200 overflow-hidden py-2.5 select-none">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                {displayItems.map((item, index) => {
                    const rawPrice =
                        item.price ??
                        item.todayPrice ??
                        item.today_price ??
                        item.currentPrice ??
                        item.current_price ??
                        0;

                    const rawChange =
                        item.change ??
                        item.changePercent ??
                        item.change_percent ??
                        item.change_percentage ??
                        item.priceChange ??
                        item.price_change ??
                        0;

                    const numChange = parseNumericValue(rawChange);
                    const isUp = numChange > 0;
                    const isDown = numChange < 0;

                    const changeBadgeColor = isUp
                        ? "text-[#c23b38]"
                        : isDown
                            ? "text-[#2e7d32]"
                            : "text-gray-500";

                    const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";
                    const formattedChange = toBengaliNumber(Math.abs(numChange).toFixed(1));

                    const rawUnit = item.unit || item.unit_bn || "কেজি";
                    const unit =
                        UNIT_MAP[String(rawUnit).trim().toLowerCase()] ||
                        String(rawUnit).replace("প্রতি ", "");

                    const title = item.name || item.name_bn || item.title || "পণ্য";
                    const id = item.id || item.slug || index;
                    const emoji = item.emoji || item.icon || "🍚";

                    return (
                        <Link
                            key={`${id}-${index}`}
                            href={`/product/${id}`}
                            className="inline-flex items-center gap-2 px-6 border-r border-gray-200 text-sm font-semibold text-gray-900 shrink-0 hover:text-emerald-700 transition"
                        >
                            <span className="text-base">{emoji}</span>
                            <span className="font-bold text-gray-900">{title}</span>
                            <span className="text-gray-700 font-medium">
                                {formatBengaliPrice(rawPrice)} টাকা/{unit}
                            </span>
                            <span className={`inline-flex items-center gap-1 font-bold ${changeBadgeColor}`}>
                                <span>{changeSymbol}</span>
                                <span>{formattedChange}%</span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}