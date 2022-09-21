import { ReactComponent as LicenseImage } from "@/assets/cc-license-by-nc-sa.svg";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";

export function Footer() {
  return (
    <Box
      style={{ bottom: 0, height: 180 }}
      sx={{
        backgroundColor: "#5286AB",
        color: "#fff",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "4em",
          gap: "2em",
        }}
      >
        <a href="https://twitter.com/ocwcentral">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          <span className="sr-only">Twitter</span>
        </a>
        <a href="https://github.com/kafugen" style={{ marginRight: "2em" }}>
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <span className="sr-only">GitHub</span>
        </a>
      </Box>
      <Box
        style={{
          marginLeft: "1px",
          position: "absolute",
          bottom: "0",
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
          <LicenseImage />
        </a>
      </Box>
    </Box>
  );
}
