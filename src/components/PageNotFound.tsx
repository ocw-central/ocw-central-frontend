import { theme } from "@/utils/themes";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function PageNotFound() {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography
        variant="h2"
        align="center"
        sx={{ color: theme.palette.primary.dark }}
      >
        404 Not Found
      </Typography>
      <Typography
        variant="h3"
        align="center"
        sx={{ color: theme.palette.primary.dark }}
      >
        {t("translation.page_not_found.message")}
      </Typography>
    </Box>
  );
}
