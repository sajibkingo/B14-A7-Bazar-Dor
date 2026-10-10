"use client";

import React from "react";
import Link from "next/link";
import { formatBengaliPrice, toBengaliNumber } from "@/lib/utils";

const UNIT_MAP = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  gm: "গ্রাম",
};

export default function ProductCard({ product }) {
  if (!product) return null;

  const rawPrice = product.today ?? product.price ?? 0;
  const dir = product.change?.dir || "flat";
  const rawPct = product.change?.pct ?? 0;

  const isUp = dir === "up" || rawPct > 0;
  const isDown = dir === "down" || rawPct < 0;

  const badgeStyle = isUp
    ? "bg-[#fdf0ed] text-[#d32f2f]"
    : isDown
    ? "bg-[#edf7ed] text-[#2e7d32]"
    : "bg-[#f4f5f4] text-gray-500";

  const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";
  const formattedPercent = toBengaliNumber(Math.abs(rawPct).toFixed(1));

  const rawUnit = product.unit || "kg";
  const unitName = UNIT_MAP[rawUnit.toLowerCase()] || rawUnit;

  const title = product.nameBn || product.name || "পণ্য";
  const id = product.id ?? product.slug;
  const emoji = product.image || product.categoryIcon || "🍚";

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
            প্রতি {unitName}
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