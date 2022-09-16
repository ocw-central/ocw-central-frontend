import { ReactComponent as LicenseImage } from "@/assets/cc-license-by-nc-sa.svg";
import { Social } from "@/components/common/Social";
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
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja">
        <LicenseImage />
      </a>
      <Social />
    </Box>
  );
}
