import { ReactComponent as LicenseImage } from "@/assets/cc-license-by-nc-sa.svg";
import { ReactComponent as Logo } from "@/assets/ocwc-owl.svg";
import styles from "@/styles/footer.module.css";

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <LicenseImage />
        [ソーシャル]
      </div>
    </footer>
  );
}
