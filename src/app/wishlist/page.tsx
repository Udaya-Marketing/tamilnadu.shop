"use client";

import Link from "next/link";
import MobileContainer from "@/components/MobileContainer";
import ProductDetailsHeader from "@/components/ProductDetailsHeader";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

export default function WishlistPage() {
  const { wishlistIds, wishlistLoaded } = useCart();
  const wishlistProducts = PRODUCTS.filter((product) => wishlistIds.includes(product.id));

  return (
    <MobileContainer>
      <ProductDetailsHeader title="My Wishlist" />

      <main className={styles.mainContent}>
        {!wishlistLoaded ? (
          <div className={styles.loadingState} role="status" aria-label="Loading wishlist" />
        ) : wishlistProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>Your wishlist is empty.</p>
            <Link href="/categories" className={styles.exploreButton}>
              Explore Products
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </MobileContainer>
  );
}
