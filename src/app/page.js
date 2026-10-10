"use client";

import React, { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import { parseNumericValue } from "@/lib/utils";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data?.data || data?.products || [];
        setProducts(list);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const risers = [...products]
    .filter((p) => {
      const ch = parseNumericValue(p.change ?? p.changePercent ?? 0);
      return ch > 0;
    })
    .sort((a, b) => {
      const chA = parseNumericValue(a.change ?? a.changePercent ?? 0);
      const chB = parseNumericValue(b.change ?? b.changePercent ?? 0);
      return chB - chA;
    })
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => {
      const ch = parseNumericValue(p.change ?? p.changePercent ?? 0);
      return ch < 0;
    })
    .sort((a, b) => {
      const chA = parseNumericValue(a.change ?? a.changePercent ?? 0);
      const chB = parseNumericValue(b.change ?? b.changePercent ?? 0);
      return chA - chB;
    })
    .slice(0, 6);

  return (
    <div className="w-full space-y-12 pb-12">
      {/* Hero / Banner Component */}
      <HeroBanner />

      {/* আজ দাম বেড়েছে ▲ */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            আজ দাম বেড়েছে ▲
          </h2>
          <span className="text-xs text-gray-400 font-semibold">(শীর্ষ ৬)</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {risers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      {/* আজ দাম কমেছে ▼ */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            আজ দাম কমেছে ▼
          </h2>
          <span className="text-xs text-gray-400 font-semibold">(শীর্ষ ৬)</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>

      {/* সব পণ্য (#সব-পণ্য Anchor Target) */}
      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">সব পণ্য</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ তালিকা
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}