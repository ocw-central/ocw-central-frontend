// https://github.com/ebisucom/next-react-website/blob/main/blog/components/contact.js
import styles from "@/styles/contact.module.css";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";

export function Contact() {
  return (
    <div className={styles.stack}>
      <h3 className={styles.heading}>Contact</h3>

      <address>feedback@ocwcentral.com</address>
    </div>
  );
}
