"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import styles from "./ProductCard.module.css";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlistIds, toggleWishlist } = useCart();
  const liked = wishlistIds.includes(product.id);

  const defaultVariant = product.variants?.[0];
  const variantId = defaultVariant?.id || product.id;
  const size = defaultVariant?.sizes?.[0] || product.sizes?.[0] || "Standard";
  const color = defaultVariant?.colors?.[0] || product.colors?.[0] || "";

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: variantId,
      variantId,
      productId: product.id,
      name: product.name,
      price: defaultVariant?.price || product.price,
      numericPrice: defaultVariant?.numericPrice || product.numericPrice,
      image: defaultVariant?.image || product.image || "",
      size,
      color
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <div className={styles.card}>
      <Link 
        href={`/product/${product.id}`} 
        className={styles.cardLink}
      >
        <div className={styles.imageWrapper}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={190}
              className={styles.productImage}
              style={{
                viewTransitionName: `product-image-${product.id}`,
              } as React.CSSProperties}
              priority
            />
          ) : (
            <div className={styles.imagePlaceholder}>!</div>
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.info}>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.subtitle}>{product.subtitle}</p>
            <span className={styles.price}>{product.price}</span>
          </div>
        </div>
      </Link>
      
      {/* Floating Like Action */}
      <button
        className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
        onClick={handleLike}
        aria-label={liked ? "Unlike product" : "Like product"}
        aria-pressed={liked}
        type="button"
      >
        <Heart
          size={14}
          className={styles.heartIcon}
          fill={liked ? "var(--like-active)" : "none"}
          stroke={liked ? "var(--like-active)" : "currentColor"}
          strokeWidth={2}
        />
      </button>

      {/* Floating Cart Action */}
      <div className={styles.cartActionWrapper}>
        <div className={styles.cartWrapper}>
          <button
            className={styles.cartButton}
            onClick={handleAddToCart}
            aria-label="Add to cart"
            type="button"
          >
            <ShoppingCart size={15} className={styles.cartIcon} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
