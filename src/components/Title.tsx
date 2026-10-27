"use client";

import React from "react";
import styles from "./Title.module.css";

export default function Title() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Refurbished laptops<br />
        ready for a new life
      </h1>
    </div>
  );
}
