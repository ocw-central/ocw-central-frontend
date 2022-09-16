// https://github.com/ebisucom/next-react-website/blob/main/blog/components/contact.js
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@/styles/contact.module.css";

export function Contact() {
  return (
    <div className={styles.stack}>
      <h3 className={styles.heading}>Contact</h3>
      <a href="https://twitter.com/ocwcentral">
        <FontAwesomeIcon icon={faTwitter} />
        <span className="sr-only">Twitter</span>
      </a>
      <a href="https://github.com/kafugen">
        <FontAwesomeIcon icon={faGithub} />
        <span className="sr-only">GitHub</span>
      </a>
      <address>ocwcentral.kyoto@gmail.com</address>
    </div>
  );
}
