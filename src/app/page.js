"use client";

import React, { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import { toBengaliNumber } from "@/lib/utils";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const json = await res.json();
        const list = Array.isArray(json)
          ? json
          : json?.data || json?.products || [];
        setProducts(list);
      } catch (err) {
        console.error("Products load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const risers = products.filter((p) => p.change?.dir === "up");
  const fallers = products.filter((p) => p.change?.dir === "down");

  return (
    <div className="w-full space-y-12 pb-16 font-sans">
      <HeroBanner />

      {/* Aj dam bereche */}
      <section>
        <div className="flex items-center gap-2.5 mb-5">
          <span className="text-[#dc2626] text-xs">▲</span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            আজ দাম বেড়েছে
          </h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : risers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {risers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 bg-white p-6 rounded-2xl border border-gray-100">
            আজ দাম বৃদ্ধি পাওয়া কোনো পণ্য নেই।
          </p>
        )}
      </section>

      {/* Aj dam komeche */}
      <section>
        <div className="flex items-center gap-2.5 mb-5">
          <span className="text-[#16a34a] text-xs">▼</span>
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
        ) : fallers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fallers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 bg-white p-6 rounded-2xl border border-gray-100">
            আজ দাম কমে যাওয়া কোনো পণ্য নেই।
          </p>
        )}
      </section>

      {/* Shob ponno */}
      <section id="all-products" className="scroll-mt-10">
        <div className="mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 bg-white p-6 rounded-2xl border border-gray-100">
            বর্তমানে কোনো পণ্যের তালিকা পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}