"use client";

import React from "react";
import { Heart } from "lucide-react";
import styles from "./FavoriteButton.module.css";
import { useCart } from "@/context/CartContext";

export default function FavoriteButton({ productId }: { productId: string }) {
  const { wishlistIds, toggleWishlist } = useCart();
  const liked = wishlistIds.includes(productId);
  
  return (
    <button
      className={`${styles.button} ${liked ? styles.liked : ""}`}
      onClick={() => toggleWishlist(productId)}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={liked}
      type="button"
    >
      <Heart
        size={18}
        className={styles.icon}
        fill={liked ? "var(--like-active)" : "none"}
        stroke={liked ? "var(--like-active)" : "currentColor"}
        strokeWidth={2}
      />
    </button>
  );
}
