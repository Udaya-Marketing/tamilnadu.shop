import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import styles from "./FeaturedPicks.module.css";

const FEATURED_PRODUCT_IDS = [
  "latitude-5420",
  "aspire-5",
  "macbook-air-2020",
  "legion-5",
];

const featuredProducts = FEATURED_PRODUCT_IDS.flatMap((id) => {
  const product = PRODUCTS.find((item) => item.id === id);
  return product ? [product] : [];
});

export default function FeaturedPicks() {
  return (
    <section className={styles.section} aria-labelledby="featured-picks-heading">
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.heading} id="featured-picks-heading">Featured Picks</h2>
          <p className={styles.description}>
            A selection of refurbished laptops from our demo catalog.
          </p>
        </div>
        <a className={styles.viewAll} href="/categories">View All</a>
      </div>

      <div className={styles.grid}>
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
