import { theme } from "@/utils/themes";
import { Box, Typography } from "@mui/material";

export function PageNotFound() {
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
        お探しのページは見つかりませんでした。
      </Typography>
    </Box>
  );
}
