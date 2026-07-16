"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CategorySlider.module.css";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

const CATEGORIES: Category[] = [
  { id: "honey", name: "Honey", emoji: "🍯" },
  { id: "dry-fish", name: "Dry Fish", emoji: "🐟" },
  { id: "meat", name: "Dry Meat", emoji: "🥩" },
  { id: "traditional", name: "Traditional", emoji: "🌿" },
];

export default function CategorySlider() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("honey");

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    router.push("/products");
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={`${styles.slider} no-scrollbar`}>
        {CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              className={`${styles.pill} ${isActive ? styles.activePill : styles.inactivePill}`}
              onClick={() => handleCategoryClick(category.id)}
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
