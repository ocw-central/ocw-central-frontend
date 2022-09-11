// https://github.com/ebisucom/next-react-website/blob/main/blog/components/social.js

import styles from "@/styles/social.module.css";

import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Social({ iconSize = "initial" }) {
  return (
    <ul className={styles.list}>
      <li>
        <a href="https://twitter.com/ocwcentral">
          <FontAwesomeIcon icon={faTwitter} />
          <span className="sr-only">Twitter</span>
        </a>
      </li>

      <li>
        <a href="https://github.com/kafugen">
          <FontAwesomeIcon icon={faGithub} />
          <span className="sr-only">GitHub</span>
        </a>
      </li>
    </ul>
  );
}
