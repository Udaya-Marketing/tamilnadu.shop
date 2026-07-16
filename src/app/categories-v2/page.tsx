"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MobileContainer from "@/components/MobileContainer";
import ProductDetailsHeader from "@/components/ProductDetailsHeader";
import BottomNav from "@/components/BottomNav";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

interface CollectionData {
  id: string;
  name: string;
  count: string;
  image: string;
  gridClass: string;
}

const COLLECTIONS: CollectionData[] = [
  {
    id: "honey",
    name: "Honey",
    count: "1 Item",
    image: "/images/home_box_honey.png",
    gridClass: styles.heroCard,
  },
  {
    id: "dry-fish",
    name: "Dry Fish",
    count: "5 Items",
    image: "/images/dry_fish_varieties.png",
    gridClass: styles.tallCard,
  },
  {
    id: "meat",
    name: "Dry Meat",
    count: "2 Items",
    image: "/images/uppukandam_mutton.png",
    gridClass: styles.squareCard1,
  },
  {
    id: "traditional",
    name: "Traditional",
    count: "5 Items",
    image: "/images/karupatti.png",
    gridClass: styles.tallCard2,
  },
];

export default function CategoriesV2Page() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push("/products");
  };

  return (
    <MobileContainer>
      <ProductDetailsHeader title="Collections" />

      <main className={styles.mainContent}>
        <div className={styles.masonryGrid}>
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              className={`${styles.card} ${col.gridClass}`}
              onClick={() => handleSelect(col.id)}
              type="button"
            >
              {/* Background Image Wrapper */}
              <div className={styles.imageWrapper}>
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.bgImage}
                  priority
                />
                <div className={styles.overlay} />
              </div>

              {/* Floating Header */}
              <div className={styles.cardHeader}>
                <span className={styles.itemCount}>{col.count}</span>
                <div className={styles.arrowIconWrapper}>
                  <ArrowUpRight size={16} strokeWidth={2.5} className={styles.arrowIcon} />
                </div>
              </div>

              {/* Bottom Footer Title */}
              <div className={styles.cardFooter}>
                <h3 className={styles.collectionName}>{col.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </MobileContainer>
  );
}
