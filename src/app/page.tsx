import MobileContainer from "@/components/MobileContainer";
import Header from "@/components/Header";
import Title from "@/components/Title";
import SearchBar from "@/components/SearchBar";
import Banner from "@/components/Banner";
import CategorySlider from "@/components/CategorySlider";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";
import DemoCatalogNotice from "@/components/DemoCatalogNotice";
import FindMyLaptop from "@/components/FindMyLaptop";
import FeaturedPicks from "@/components/FeaturedPicks";
import NewArrivals from "@/components/NewArrivals";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import styles from "./page.module.css";

export default function Home() {
  return (
    <MobileContainer>
      <Header />
      <main className={styles.mainContent}>
        {/* Top Split Section for Desktop, normal flow for Mobile/Tablet */}
        <div className={styles.topSection}>
          <div className={styles.heroLeft}>
            <Title />
            <SearchBar />
            <div className={styles.desktopCategories}>
              <CategorySlider categories={CATEGORIES} />
            </div>
          </div>
          <div className={styles.heroRight}>
            <Banner />
          </div>
        </div>
        
        {/* Horizontal Category Slider for Mobile/Tablet flow */}
        <div className={styles.mobileCategories}>
          <CategorySlider categories={CATEGORIES} />
        </div>

        <DemoCatalogNotice />
        <FindMyLaptop />
        <NewArrivals />
        <FeaturedPicks />

        {/* Responsive Product Grid */}
        <ProductGrid products={PRODUCTS.slice(0, 12)} />
      </main>
      <BottomNav />
    </MobileContainer>
  );
}
