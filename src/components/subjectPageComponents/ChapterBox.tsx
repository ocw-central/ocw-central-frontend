import { Box, Typography } from "@mui/material";
import YouTube from "react-youtube";

export function ChapterBox() {
  return (
    <Box className="ChapterBox" sx={{}}>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        Chapter Box
      </Typography>
    </Box>
  );
}
