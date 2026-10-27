"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(query ? `/categories?query=${encodeURIComponent(query)}` : "/categories");
  };

  return (
    <form className={styles.container} onSubmit={handleSearch} role="search">
      <div className={styles.searchWrapper}>
        <Search size={20} className={styles.searchIcon} strokeWidth={2} />
        <input
          type="text"
          placeholder="Search laptops..."
          aria-label="Search laptops"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button
        className={styles.filterButton}
        aria-label="Open laptop filters"
        type="button"
        onClick={() => router.push("/categories?filters=open")}
      >
        <SlidersHorizontal size={20} className={styles.filterIcon} strokeWidth={2} />
      </button>
    </form>
  );
}
