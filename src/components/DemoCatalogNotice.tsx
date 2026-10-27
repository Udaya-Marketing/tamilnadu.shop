import styles from "./DemoCatalogNotice.module.css";

export default function DemoCatalogNotice() {
  return (
    <p className={styles.notice} role="status">
      Demo catalog: these refurbished laptop listings use sample data. Live inventory and checkout are not connected.
    </p>
  );
}
