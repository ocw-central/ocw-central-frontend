// https://github.com/ebisucom/next-react-website/blob/main/blog/components/contact.js

import { Social } from "@/components/common/Social";
import styles from "@/styles/contact.module.css";

export function Contact() {
  return (
    <div className={styles.stack}>
      <h3 className={styles.heading}>Contact</h3>
      <Social iconSize="30px" />
      <address>ocwcentral.kyoto@gmail.com</address>
    </div>
  );
}
