import { Box, Typography } from "@mui/material";

export function PageNotFound() {
  return (
    <Box>
      <Typography variant="h2" align="center" sx={{ color: "black" }}>
        404 Not Found
      </Typography>
      <Typography variant="h3" align="center" sx={{ color: "black" }}>
        お探しのページは見つかりませんでした。
      </Typography>
    </Box>
  );
}
