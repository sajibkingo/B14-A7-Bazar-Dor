"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { formatBengaliPrice, toBengaliNumber } from "@/lib/utils";
import { toast } from "react-toastify";

const UNIT_MAP = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gm: "গ্রাম",
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user, isPending } = useAuth();
    const rawParam = params?.slug ? String(params.slug) : "";

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        if (!isPending && !user) {
            toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন", {
                toastId: "auth-redirect-toast",
            });
            router.push("/signin");
        }
    }, [user, isPending, router]);

    useEffect(() => {
        async function fetchProduct() {
            if (!rawParam) return;
            try {
                const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
                if (!res.ok) throw new Error("Failed to load products");
                const json = await res.json();
                const list = Array.isArray(json)
                    ? json
                    : json?.data || json?.products || [];

                const found = list.find(
                    (item) =>
                        String(item.id) === rawParam ||
                        String(item.slug) === rawParam ||
                        encodeURIComponent(String(item.slug)) === encodeURIComponent(rawParam)
                );

                if (!found) {
                    setIsNotFound(true);
                } else {
                    setProduct(found);
                }
            } catch (err) {
                setIsNotFound(true);
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            fetchProduct();
        }
    }, [rawParam, user]);

    if (isPending || (!user && !isPending)) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#3c7844]"></span>
            </div>
        );
    }

    if (isNotFound) {
        notFound();
    }

    if (loading) {
        return (
            <div className="w-full space-y-8 animate-pulse pb-16">
                <div className="h-5 bg-gray-200 rounded w-48"></div>
                <div className="bg-[#fcfdfc] rounded-3xl p-8 border border-gray-100 h-44"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-[#fcfdfc] rounded-2xl p-6 border border-gray-100 h-32"></div>
                    <div className="bg-[#fcfdfc] rounded-2xl p-6 border border-gray-100 h-32"></div>
                    <div className="bg-[#fcfdfc] rounded-2xl p-6 border border-gray-100 h-32"></div>
                </div>
                <div className="bg-[#fcfdfc] rounded-3xl p-8 border border-gray-100 h-80"></div>
            </div>
        );
    }

    if (!product) return null;

    const rawUnit = product.unit || "kg";
    const unit = UNIT_MAP[rawUnit.toLowerCase()] || rawUnit;

    const todayPrice = product.today ?? product.price ?? 0;
    const yesterdayPrice = product.yesterday ?? todayPrice;
    const priceDiff = Math.abs(todayPrice - yesterdayPrice);

    const dir = product.change?.dir || "flat";
    const rawPct = product.change?.pct ?? 0;
    const isUp = dir === "up" || rawPct > 0;
    const isDown = dir === "down" || rawPct < 0;

    const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";
    const changeColor = isUp
        ? "text-[#d32f2f]"
        : isDown
            ? "text-[#2e7d32]"
            : "text-gray-500";

    const diffText =
        dir === "up"
            ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBengaliNumber(priceDiff)} টাকা`
            : dir === "down"
                ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBengaliNumber(priceDiff)} টাকা`
                : "গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে";

    const markets = Array.isArray(product.markets) ? product.markets : [];

    let minPrice = todayPrice;
    let maxPrice = todayPrice;
    let avgPrice = todayPrice;

    if (markets.length > 0) {
        const minValues = markets.map((m) => m.min).filter((n) => typeof n === "number");
        const maxValues = markets.map((m) => m.max).filter((n) => typeof n === "number");

        minPrice = minValues.length > 0 ? Math.min(...minValues) : todayPrice;
        maxPrice = maxValues.length > 0 ? Math.max(...maxValues) : todayPrice;

        const allAverages = markets.map((m) => ((m.min ?? 0) + (m.max ?? 0)) / 2);
        avgPrice = Math.round(allAverages.reduce((a, b) => a + b, 0) / allAverages.length);
    }

    return (
        <div className="w-full space-y-8 pb-16 font-sans">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                <Link href="/" className="hover:text-black transition">
                    হোম
                </Link>
                <span>›</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-black transition"
                >
                    {product.categoryNameBn || "ক্যাটাগরি"}
                </Link>
                <span>›</span>
                <span className="text-gray-900 font-semibold">{product.nameBn}</span>
            </nav>

            <div className="bg-[#fcfdfc] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-5xl shrink-0">
                        {product.image || product.categoryIcon || "🍚"}
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                            {product.nameBn}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                            প্রতি {unit} · {product.categoryNameBn}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium mt-3">
                            {diffText}
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-auto self-stretch md:self-auto bg-[#f4f7f4]/60 rounded-2xl px-8 py-5 border border-gray-100 flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
                    <span className="text-4xl font-black text-gray-900 my-1">
                        {formatBengaliPrice(todayPrice)}
                    </span>
                    <span className="text-xs text-gray-500 font-medium mb-1">
                        টাকা / {unit}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${changeColor}`}>
                        <span>{changeSymbol}</span>
                        <span>{toBengaliNumber(Math.abs(rawPct).toFixed(1))}%</span>
                    </span>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight mb-4">
                    দামের সারসংক্ষেপ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-[#fcfdfc] rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <span className="text-xs text-gray-500 font-medium block">
                            সর্বনিম্ন দাম
                        </span>
                        <span className="text-2xl font-black text-[#2e7d32] mt-1.5 block">
                            {formatBengaliPrice(minPrice)} টাকা
                        </span>
                        <span className="text-xs text-gray-400 mt-2 block">
                            সবচেয়ে কম দামের বাজার
                        </span>
                    </div>

                    <div className="bg-[#fcfdfc] rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <span className="text-xs text-gray-500 font-medium block">
                            সর্বাধিক দাম
                        </span>
                        <span className="text-2xl font-black text-[#d32f2f] mt-1.5 block">
                            {formatBengaliPrice(maxPrice)} টাকা
                        </span>
                        <span className="text-xs text-gray-400 mt-2 block">
                            সবচেয়ে বেশি দামের বাজার
                        </span>
                    </div>

                    <div className="bg-[#fcfdfc] rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <span className="text-xs text-gray-500 font-medium block">
                            গড় দাম
                        </span>
                        <span className="text-2xl font-black text-[#3c7844] mt-1.5 block">
                            {formatBengaliPrice(avgPrice)} টাকা
                        </span>
                        <span className="text-xs text-gray-400 mt-2 block">
                            প্রতি {unit}-এর হিসাবে
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight mb-4">
                    বাজারভিত্তিক আজকের দাম
                </h2>
                <div className="bg-[#fcfdfc] rounded-3xl border border-gray-100 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs text-gray-500 font-semibold bg-[#f9faf9]">
                                    <th className="py-4 px-6 font-semibold">বাজার</th>
                                    <th className="py-4 px-6 font-semibold">বিভাগ</th>
                                    <th className="py-4 px-6 font-semibold">সর্বনিম্ন</th>
                                    <th className="py-4 px-6 font-semibold">সর্বাধিক</th>
                                    <th className="py-4 px-6 font-semibold text-right">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {markets.map((m, idx) => {
                                    const mAvg = ((m.min ?? 0) + (m.max ?? 0)) / 2;
                                    const isDecimal = mAvg % 1 !== 0;
                                    const formattedAvg = isDecimal
                                        ? `${toBengaliNumber(mAvg.toFixed(2))} টাকা`
                                        : `${formatBengaliPrice(mAvg)} টাকা`;

                                    return (
                                        <tr
                                            key={idx}
                                            className="hover:bg-[#f4f7f4]/40 transition duration-150 text-gray-800"
                                        >
                                            <td className="py-4 px-6 font-semibold text-gray-900">
                                                {m.market}
                                            </td>
                                            <td className="py-4 px-6 text-gray-600 font-normal">
                                                {m.division}
                                            </td>
                                            <td className="py-4 px-6 font-medium text-gray-700">
                                                {formatBengaliPrice(m.min)} টাকা
                                            </td>
                                            <td className="py-4 px-6 font-medium text-gray-700">
                                                {formatBengaliPrice(m.max)} টাকা
                                            </td>
                                            <td className="py-4 px-6 text-right font-black text-gray-900">
                                                {formattedAvg}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}