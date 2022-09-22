import { ReactComponent as LicenseImage } from "@/assets/cc-license-by-nc-sa.svg";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        flexGrow: "1",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      sx={{
        backgroundColor: "#5286AB",
        color: "#fff",
      }}
    >
      <Box
        style={{
          marginLeft: "0px",
          position: "relative",
          bottom: "0",
          alignSelf: "flex-end",
        }}
      >
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja"
          style={{
            justifyContent: "flex-start",
            alignSelf: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <LicenseImage style={{ position: "relative", left: "0" }} />
        </a>
      </Box>
      <Link to="/">
        <Logo
          style={{
            position: "relative",
            width: "16em",
            height: "10em",
            alignSelf: "center",
          }}
        />
      </Link>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          marginTop: "4em",
          gap: "2em",
        }}
      >
        <a href="https://twitter.com/ocwcentral">
          <FontAwesomeIcon
            icon={faTwitter}
            size="3x"
            style={{ alignSelf: "flex-end" }}
          />
          <span className="sr-only">Twitter</span>
        </a>
        <a href="https://github.com/kafugen" style={{ marginRight: "2em" }}>
          <FontAwesomeIcon
            icon={faGithub}
            size="3x"
            style={{ alignSelf: "flex-end" }}
          />
          <span className="sr-only">GitHub</span>
        </a>
      </Box>
    </Box>
  );
}
