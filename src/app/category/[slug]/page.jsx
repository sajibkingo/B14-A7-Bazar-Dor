"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import { toBengaliNumber } from "@/lib/utils";

export default function CategoryPage() {
    const params = useParams();
    const rawSlug = params?.slug ? String(params.slug).toLowerCase() : "";

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        async function loadCategoryData() {
            if (!rawSlug) return;
            setLoading(true);

            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch("https://api.api-store.workers.dev/api/bazardor/categories"),
                    fetch("https://api.api-store.workers.dev/api/bazardor/products"),
                ]);

                let matchedCat = null;
                if (catRes.ok) {
                    const catData = await catRes.json();
                    const catList = Array.isArray(catData)
                        ? catData
                        : catData?.data || catData?.categories || [];
                    matchedCat = catList.find(
                        (c) =>
                            String(c.id).toLowerCase() === rawSlug ||
                            String(c.slug).toLowerCase() === rawSlug
                    );
                }

                let matchedProducts = [];
                if (prodRes.ok) {
                    const prodData = await prodRes.json();
                    const prodList = Array.isArray(prodData)
                        ? prodData
                        : prodData?.data || prodData?.products || [];
                    matchedProducts = prodList.filter(
                        (p) =>
                            String(p.category).toLowerCase() === rawSlug ||
                            String(p.categorySlug).toLowerCase() === rawSlug
                    );
                }

                setCategory(matchedCat);
                setProducts(matchedProducts);
            } catch (err) {
                console.error("Error loading category page data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadCategoryData();
    }, [rawSlug]);

    const sortedProducts = [...products].sort((a, b) => {
        const priceA = a.today ?? a.price ?? 0;
        const priceB = b.today ?? b.price ?? 0;

        if (sortBy === "lowToHigh") return priceA - priceB;
        if (sortBy === "highToLow") return priceB - priceA;
        return 0;
    });

    if (loading) {
        return (
            <div className="w-full space-y-6 pb-16 font-sans">
                <div className="bg-[#fcfdfc] rounded-3xl p-6 sm:p-8 border border-gray-100 h-32 animate-pulse"></div>
                <div className="bg-[#fcfdfc] rounded-2xl p-4 border border-gray-100 h-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (!category && products.length === 0) {
        return (
            <div className="bg-[#fcfdfc] rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto my-12 shadow-sm space-y-4">
                <span className="text-5xl block">⚠️</span>
                <h2 className="text-xl font-bold text-gray-800">ক্যাটাগরি পাওয়া যায়নি</h2>
                <p className="text-sm text-gray-500">
                    আপনি যে ক্যাটাগরিটি খুঁজছেন তার কোনো অস্তিত্ব নেই অথবা লিঙ্কটি সঠিক নয়।
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-2.5 bg-[#3c7844] hover:bg-[#326438] text-white font-bold rounded-xl text-sm transition"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    const categoryName = category?.nameBn || products[0]?.categoryNameBn || "ক্যাটাগরি";
    const categoryIcon = category?.icon || products[0]?.categoryIcon || products[0]?.image || "🛒";
    const productCount = products.length;

    return (
        <div className="w-full space-y-6 pb-16 font-sans">
            <div className="bg-[#fcfdfc] rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-4xl shrink-0">
                    {categoryIcon}
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {categoryName}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        {toBengaliNumber(productCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            <div className="bg-[#fcfdfc] rounded-2xl px-6 py-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex justify-end items-center">
                <div className="flex items-center gap-3">
                    <label htmlFor="sort" className="text-xs sm:text-sm font-semibold text-gray-600">
                        সাজান
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-bordered select-sm bg-white border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-800 focus:border-[#3c7844] focus:outline-none"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="lowToHigh">দাম: কম থেকে বেশি</option>
                        <option value="highToLow">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 font-medium pl-1">
                মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            {sortedProducts.length === 0 ? (
                <div className="bg-[#fcfdfc] rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto my-8 shadow-sm space-y-4">
                    <span className="text-5xl block">🔍</span>
                    <h2 className="text-xl font-bold text-gray-800">কোনো পণ্য পাওয়া যায়নি</h2>
                    <p className="text-sm text-gray-500">
                        এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য তালিকাভুক্ত নেই।
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-2.5 bg-[#3c7844] hover:bg-[#326438] text-white font-bold rounded-xl text-sm transition"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sortedProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            )}
        </div>
    );
}