import { ReactComponent as LicenseImage } from "@/assets/cc-license-by-nc-sa.svg";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Box sx={{ backgorundColor: "#5286AB", color: "#fff" }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        sx={{
          backgroundColor: "#5286AB",
          px: { xl: "13%", lg: "10%", md: "10%", sm: "3%", xs: "3%" },
        }}
      >
        <Box
          style={{
            marginLeft: "0px",
            position: "relative",
            bottom: "1em",
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
        <Box sx={{ display: { xs: "none", sm: "contents" } }}>
          <Link to="/">
            <Logo
              style={{
                position: "relative",
                width: "11em",
                height: "10em",
                alignSelf: "center",
              }}
            />
          </Link>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            marginTop: "5em",
            gap: "2em",
          }}
        >
          <a href="https://twitter.com/ocwcentral">
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              style={{ alignSelf: "flex-end" }}
            />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://github.com/ocw-central"
            style={{ marginRight: "2em" }}
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              style={{ alignSelf: "flex-end" }}
            />
            <span className="sr-only">GitHub</span>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
