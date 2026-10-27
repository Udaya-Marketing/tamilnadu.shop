"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CategorySlider.module.css";
import { CATEGORIES, CatalogCategory } from "@/data/products";

interface CategorySliderProps {
  categories?: CatalogCategory[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const router = useRouter();
  const displayCategories = categories && categories.length > 0 ? categories : CATEGORIES;
  const [activeCategory, setActiveCategory] = useState(displayCategories[0]?.id || "");

  const handleCategoryClick = (id: string, slug?: string) => {
    setActiveCategory(id);
    router.push(`/categories?category=${encodeURIComponent(slug || id)}`);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={`${styles.slider} no-scrollbar`}>
        {displayCategories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              className={`${styles.pill} ${isActive ? styles.activePill : styles.inactivePill}`}
              onClick={() => handleCategoryClick(category.id, category.slug)}
            >
              <span className={styles.emojiCircle}>
                {category.emoji}
              </span>
              <span className={styles.name}>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
