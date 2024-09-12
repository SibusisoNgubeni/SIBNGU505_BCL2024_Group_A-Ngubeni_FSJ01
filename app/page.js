import styles from "./products.css";
import ProductsPage from "./products/productsPage";

export default function Home() {
  return (
    <div className={styles.page}>
      <ProductsPage/>
    </div>
  );
}
