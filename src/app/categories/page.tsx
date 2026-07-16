"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MobileContainer from "@/components/MobileContainer";
import ProductDetailsHeader from "@/components/ProductDetailsHeader";
import BottomNav from "@/components/BottomNav";
import { ChevronRight } from "lucide-react";
import styles from "./page.module.css";

interface CategoryData {
  id: string;
  name: string;
  emoji: string;
  count: string;
  gradient: string;
}

const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "honey",
    name: "Honey",
    emoji: "🍯",
    count: "1 Item",
    gradient: "linear-gradient(135deg, #e9e9e7 0%, #dfdfdf 100%)",
  },
  {
    id: "dry-fish",
    name: "Dry Fish",
    emoji: "🐟",
    count: "5 Items",
    gradient: "linear-gradient(135deg, #e9e9e7 0%, #dfdfdf 100%)",
  },
  {
    id: "meat",
    name: "Dry Meat",
    emoji: "🥩",
    count: "2 Items",
    gradient: "linear-gradient(135deg, #e9e9e7 0%, #dfdfdf 100%)",
  },
  {
    id: "traditional",
    name: "Traditional",
    emoji: "🌿",
    count: "5 Items",
    gradient: "linear-gradient(135deg, #e9e9e7 0%, #dfdfdf 100%)",
  },
];

export default function AllCategoriesPage() {
  const router = useRouter();

  const handleCategorySelect = (id: string) => {
    router.push("/products");
  };

  return (
    <MobileContainer>
      <ProductDetailsHeader title="All Categories" />

      <main className={styles.mainContent}>
        <div className={styles.grid}>
          {CATEGORIES_DATA.map((category) => (
            <button
              key={category.id}
              className={styles.card}
              onClick={() => handleCategorySelect(category.id)}
              style={{ background: category.gradient }}
              type="button"
            >
              <div className={styles.emojiContainer}>
                <span className={styles.emoji}>{category.emoji}</span>
              </div>
              
              <div className={styles.info}>
                <h3 className={styles.name}>{category.name}</h3>
                <span className={styles.count}>{category.count}</span>
              </div>

              <div className={styles.arrowButton}>
                <ChevronRight size={18} className={styles.arrowIcon} />
              </div>
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </MobileContainer>
  );
}
