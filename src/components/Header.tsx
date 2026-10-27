"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import NotificationButton from "@/components/NotificationButton";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const { cartCount, setSidebarOpen, isLoggedIn, user, setLoginModalOpen } = useCart();

  const handleCartClick = () => {
    if (window.innerWidth < 768) {
      router.push("/cart");
    } else {
      setSidebarOpen(true);
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoPlaceholder} aria-label="Brand logo placeholder">
          Logo
        </div>
        <span className={styles.brandName}>Tamilnadu.shop</span>
      </div>
      <div 
        className={styles.profileContainer} 
        onClick={handleProfileClick}
        style={{ cursor: "pointer" }}
      >
        <Image
          src={isLoggedIn && user ? user.avatar : "/images/profile-placeholder.svg"}
          alt="Profile Avatar"
          width={44}
          height={44}
          className={styles.profilePic}
          style={{ opacity: isLoggedIn ? 1 : 0.65 }}
          priority
        />
      </div>
      <div className={styles.actionsContainer}>
        <button 
          className={styles.iconButton} 
          aria-label="Shopping Cart"
          onClick={handleCartClick}
        >
          <ShoppingBag size={22} strokeWidth={1.8} className={styles.icon} />
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </button>
        <NotificationButton />
      </div>
    </header>
  );
}
