"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatBengaliPrice, toBengaliNumber } from "@/lib/utils";

const UNIT_MAP = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gm: "গ্রাম",
};

export default function PriceTicker() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
                if (!res.ok) return;
                const data = await res.json();
                const list = Array.isArray(data)
                    ? data
                    : data?.data || data?.products || [];
                setItems(list);
            } catch (err) {
                console.error("Ticker fetch error:", err);
            }
        }

        loadProducts();
    }, []);

    if (!items || items.length === 0) return null;

    const displayItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-white border-b border-gray-200 overflow-hidden py-3 select-none">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                {displayItems.map((item, index) => {
                    const rawPrice = item.today ?? item.price ?? 0;
                    const dir = item.change?.dir || "flat";
                    const rawPct = item.change?.pct ?? 0;

                    const isUp = dir === "up" || rawPct > 0;
                    const isDown = dir === "down" || rawPct < 0;

                    const changeBadgeColor = isUp
                        ? "text-[#c23b38]"
                        : isDown
                            ? "text-[#2e7d32]"
                            : "text-gray-500";

                    const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";
                    const formattedChange = toBengaliNumber(Math.abs(rawPct).toFixed(1));

                    const rawUnit = item.unit || "kg";
                    const unit = UNIT_MAP[rawUnit.toLowerCase()] || rawUnit;

                    const title = item.nameBn || item.name || "পণ্য";
                    const id = item.id ?? item.slug ?? index;
                    const emoji = item.image || item.categoryIcon || "🍚";

                    return (
                        <Link
                            key={`${id}-${index}`}
                            href={`/product/${id}`}
                            className="inline-flex items-center gap-2 px-6 border-r border-gray-200 text-sm font-semibold text-gray-900 shrink-0 hover:text-emerald-700 transition"
                        >
                            <span className="text-lg">{emoji}</span>
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