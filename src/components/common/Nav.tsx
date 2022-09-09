import styles from "@/styles/Nav.module.css";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <Link to="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <a>このサイトについて</a>
          </Link>
        </li>
        <li>
          <Link to="/guideline">
            <a>利用ガイド</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
