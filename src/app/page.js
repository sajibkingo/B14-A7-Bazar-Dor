"use client";

import React, { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import { parseNumericValue, toBengaliNumber } from "@/lib/utils";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : data?.data || data?.products || [];
        setProducts(list);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const risers = [...products]
    .filter((p) => {
      const ch = parseNumericValue(p.change ?? p.changePercent ?? p.change_percent ?? 0);
      return ch > 0;
    })
    .sort((a, b) => {
      const chA = parseNumericValue(a.change ?? a.changePercent ?? a.change_percent ?? 0);
      const chB = parseNumericValue(b.change ?? b.changePercent ?? b.change_percent ?? 0);
      return chB - chA;
    })
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => {
      const ch = parseNumericValue(p.change ?? p.changePercent ?? p.change_percent ?? 0);
      return ch < 0;
    })
    .sort((a, b) => {
      const chA = parseNumericValue(a.change ?? a.changePercent ?? a.change_percent ?? 0);
      const chB = parseNumericValue(b.change ?? b.changePercent ?? b.change_percent ?? 0);
      return chA - chB;
    })
    .slice(0, 6);

  return (
    <div className="w-full space-y-12 pb-16">
      <HeroBanner />

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#d32f2f] text-sm">▲</span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {risers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#2e7d32] text-sm">▼</span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            আজ দাম কমেছে
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fallers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      <section id="সব-পণ্য" className="scroll-mt-24 pt-2">
        <div className="mb-5">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}