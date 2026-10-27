import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Trusted tech,<br />
          smarter <span className={styles.highlight}>prices</span>
        </h2>
        <Link href="/products" className={styles.shopButton}>
          <span>Shop now</span>
          <ArrowRight size={14} className={styles.arrowIcon} strokeWidth={2.5} />
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/images/laptop_sleek.png"
          alt="Refurbished laptop"
          fill
          sizes="(max-width: 767px) 40vw, (max-width: 1023px) 35vw, 100vw"
          className={styles.hoodieImage}
          priority
        />
      </div>
    </div>
  );
}
