"use client";

import React, { useState, useEffect } from "react";
import MobileContainer from "@/components/MobileContainer";
import ProductDetailsHeader from "@/components/ProductDetailsHeader";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";
import DemoCatalogNotice from "@/components/DemoCatalogNotice";
import { PRODUCTS } from "@/data/products";
import { Search, X } from "lucide-react";
import styles from "./page.module.css";

export default function ExploreProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) setSelectedCategory(category);
  }, []);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MobileContainer>
      <ProductDetailsHeader title="Refurbished laptops" />
      
      <main className={styles.mainContent}>
        <DemoCatalogNotice />

        {/* Full-width Search Input */}
        <div className={styles.searchContainer}>
          <Search size={20} className={styles.searchIcon} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search laptops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Active Category Filter Badge */}
        {selectedCategory && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", marginTop: "-4px", flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "16px",
              backgroundColor: "rgba(229, 166, 60, 0.08)",
              border: "1px solid rgba(229, 166, 60, 0.15)",
              fontSize: "12px",
              fontWeight: 600,
              color: "#d48d1e"
            }}>
              Category: {selectedCategory.toUpperCase().replace("-", " ")}
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  if (typeof window !== "undefined") {
                    window.history.replaceState({}, "", "/products");
                  }
                }} 
                style={{
                  background: "none",
                  border: "none",
                  padding: "0",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  color: "#d48d1e",
                  marginLeft: "2px"
                }}
                type="button"
                aria-label="Remove category filter"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </span>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No products found matching &quot;{searchQuery || selectedCategory}&quot;</p>
          </div>
        )}
      </main>

      <BottomNav />
    </MobileContainer>
  );
}
