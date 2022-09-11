import { ReactComponent as LicenseImage } from "@/assets/cc-license-by-nc-sa.svg";
import { Nav } from "@/components/common/Nav";
import { Social } from "@/components/common/Social";
import { ReactComponent as Logo } from "@/assets/ocwc-owl.svg";
import styles from "@/styles/footer.module.css";

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <LicenseImage />
        <Social />
        <Nav />
      </div>
    </footer>
  );
}
