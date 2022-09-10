import styles from "@/styles/Nav.module.css";
import { Link } from "react-router-dom";

import { Box } from "@mui/material";

const linkNames = [
  { link: "/", name: "Home" },
  { link: "/about", name: "このサイトについて" },
  { link: "/guideline", name: "利用ガイド" },
];

export function Nav() {
  return (
    <nav>
      <ul className={styles.list}>
        {linkNames.map((linkName) => (
          <li>
            <Box
              mr={1}
              sx={{
                "&:hover": {
                  color: "rgba(255,255,255,0.7)",
                },
              }}
            >
              <Link to={linkName.link}>
                <a>{linkName.name}</a>
              </Link>
            </Box>
          </li>
        ))}
      </ul>
    </nav>
  );
}
