"use client";

import React, { useState } from "react";
import MobileContainer from "@/components/MobileContainer";
import ProductDetailsHeader from "@/components/ProductDetailsHeader";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";
import DemoCatalogNotice from "@/components/DemoCatalogNotice";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { Search, SlidersHorizontal, X } from "lucide-react";
import styles from "@/app/products-v2/page.module.css";

const CATALOG_CATEGORIES = [
  { id: "all", name: "All", emoji: "🛍️" },
  ...CATEGORIES.map(({ id, name, emoji }) => ({ id, name, emoji })),
];

const CONFIGURATIONS = ["All", ...Array.from(new Set(PRODUCTS.flatMap((product) => product.sizes)))];

const PRICE_RANGES = [
  { id: "all", label: "All Prices" },
  { id: "under-25000", label: "Under ₹25,000" },
  { id: "25000-50000", label: "₹25,000 - ₹50,000" },
  { id: "over-50000", label: "Over ₹50,000" },
];

interface LaptopCatalogProps {
  title: string;
  initialSearchQuery?: string;
  initialCategory?: string;
}

export default function LaptopCatalog({
  title,
  initialSearchQuery = "",
  initialCategory = "all",
}: LaptopCatalogProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedConfiguration, setSelectedConfiguration] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [showFilterPanel, setShowFilterPanel] = useState(true);

  const filteredProducts = PRODUCTS.filter((product) => {
    const searchableText = `${product.name} ${product.subtitle} ${product.description}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchQuery.trim().toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesConfiguration =
      selectedConfiguration === "All" || product.sizes.includes(selectedConfiguration);

    let matchesPrice = true;
    if (selectedPriceRange === "under-25000") {
      matchesPrice = product.numericPrice < 25000;
    } else if (selectedPriceRange === "25000-50000") {
      matchesPrice = product.numericPrice >= 25000 && product.numericPrice <= 50000;
    } else if (selectedPriceRange === "over-50000") {
      matchesPrice = product.numericPrice > 50000;
    }

    return matchesSearch && matchesCategory && matchesConfiguration && matchesPrice;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedConfiguration("All");
    setSelectedPriceRange("all");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedConfiguration !== "All" ||
    selectedPriceRange !== "all";

  return (
    <MobileContainer>
      <ProductDetailsHeader title={title} />

      <main className={styles.mainContent}>
        <DemoCatalogNotice />

        <div className={styles.searchRow}>
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} strokeWidth={2.5} />
            <input
              type="search"
              placeholder="Search laptops..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className={styles.searchInput}
              aria-label="Search laptops"
            />
          </div>
          <button
            onClick={() => setShowFilterPanel((visible) => !visible)}
            className={`${styles.filterToggle} ${showFilterPanel ? styles.filterActive : ""}`}
            aria-label={showFilterPanel ? "Hide filters" : "Show filters"}
            aria-expanded={showFilterPanel}
            type="button"
          >
            <SlidersHorizontal size={18} strokeWidth={2.5} />
          </button>
        </div>

        {showFilterPanel && (
          <div className={styles.filterPanel}>
            <div className={styles.filterSection}>
              <h4 className={styles.filterLabel}>Category</h4>
              <div className={`${styles.horizontalSlider} no-scrollbar`}>
                {CATALOG_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${styles.pill} ${
                      selectedCategory === category.id ? styles.pillActive : styles.pillInactive
                    }`}
                    aria-pressed={selectedCategory === category.id}
                    type="button"
                  >
                    <span className={styles.pillEmoji}>{category.emoji}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterLabel}>Configuration</h4>
              <div className={styles.sizesRow}>
                {CONFIGURATIONS.map((configuration) => (
                  <button
                    key={configuration}
                    onClick={() => setSelectedConfiguration(configuration)}
                    className={`${styles.sizeBtn} ${
                      selectedConfiguration === configuration ? styles.sizeActive : styles.sizeInactive
                    }`}
                    aria-pressed={selectedConfiguration === configuration}
                    type="button"
                  >
                    {configuration}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4 className={styles.filterLabel}>Price Range</h4>
              <div className={styles.priceRow}>
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`${styles.priceBtn} ${
                      selectedPriceRange === range.id ? styles.priceActive : styles.priceInactive
                    }`}
                    aria-pressed={selectedPriceRange === range.id}
                    type="button"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button onClick={resetFilters} className={styles.resetButton} type="button">
                Clear Filters <X size={12} strokeWidth={3} style={{ marginLeft: 6 }} />
              </button>
            )}
          </div>
        )}

        <div className={styles.resultsInfo} aria-live="polite">
          <span className={styles.resultsText}>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No laptops match these filters.</p>
            <button onClick={resetFilters} className={styles.emptyResetBtn} type="button">
              Reset filters
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </MobileContainer>
  );
}
