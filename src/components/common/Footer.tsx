import { ReactComponent as LicenseImage } from "@/assets/cc-license-by-nc-sa.svg";
import { Social } from "@/components/common/Social";
import styles from "@/styles/footer.module.css";

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <LicenseImage />
        <Social />
      </div>
    </footer>
  );
}
