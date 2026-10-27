import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import styles from "./NewArrivals.module.css";

const NEW_ARRIVAL_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
const now = Date.now();

const newArrivals = PRODUCTS
  .flatMap((product) => {
    if (!product.listedAt) return [];

    const listedAt = Date.parse(product.listedAt);
    if (!Number.isFinite(listedAt) || listedAt > now || now - listedAt > NEW_ARRIVAL_WINDOW_MS) {
      return [];
    }

    return [{ product, listedAt }];
  })
  .sort((first, second) => second.listedAt - first.listedAt)
  .slice(0, 4);

export default function NewArrivals() {
  return (
    <section className={styles.section} aria-labelledby="new-arrivals-heading">
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.heading} id="new-arrivals-heading">New Arrivals</h2>
          <p className={styles.description}>
            Demo listings with sample prices and dates; these are not live inventory.
          </p>
        </div>
        {newArrivals.length > 0 && (
          <a className={styles.viewAll} href="/categories">View All</a>
        )}
      </div>

      {newArrivals.length > 0 ? (
        <div className={styles.grid}>
          {newArrivals.map(({ product }) => (
            <div className={styles.product} key={product.id}>
              <span className={styles.badge}>New</span>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState} role="status">
          New arrivals will appear here when verified listing dates are available.
        </p>
      )}
    </section>
  );
}
