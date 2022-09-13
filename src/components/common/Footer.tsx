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
      <LicenseImage />
      <Social />
    </Box>
  );
}
