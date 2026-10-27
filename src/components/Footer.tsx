"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoBadge}>T</div>
          <h4 className={styles.brandTitle}>Tamilnadu.shop</h4>
          <p className={styles.tagline}>
            Refurbished laptops from brands you know.
          </p>
        </div>

        {/* Link Column 1: Shop */}
        <div className={styles.linkCol}>
          <span className={styles.colTitle}>Shop</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/" className={styles.link}>
                Home Catalog
              </Link>
            </li>
            <li>
              <Link href="/products-v2" className={styles.link}>
                Explore Products
              </Link>
            </li>
            <li>
              <Link href="/categories-v2" className={styles.link}>
                Laptop categories
              </Link>
            </li>
            <li>
              <Link href="/coupons" className={styles.link}>
                Offers
              </Link>
            </li>
          </ul>
        </div>

        {/* Link Column 2: Legal Policies */}
        <div className={styles.linkCol}>
          <span className={styles.colTitle}>Policies</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/terms" className={styles.link}>
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/addresses" className={styles.link}>
                Shipping Addresses
              </Link>
            </li>
          </ul>
        </div>

        {/* Link Column 3: Contact Info */}
        <div className={styles.linkCol}>
          <span className={styles.colTitle}>Contact Us</span>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactLabel}>Phone:</span>
              <span className={styles.contactValue}>+91 9208660866</span>
            </li>
            <li>
              <span className={styles.contactLabel}>Location:</span>
              <span className={styles.contactValue}>Namakkal,Tamil Nadu</span>
            </li>
            <li>
              <span className={styles.contactLabel}>Store Address:</span>
              <span className={styles.contactValue}>
                1st Floor, 1/129/19,  Ponnusamy Nagar, Pappinayakkanpatti, Namakkal, Tamil Nadu 637003
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} Tamilnadu.shop. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
