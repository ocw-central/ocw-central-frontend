import { Box } from "@mui/system";

export function Main() {
  return (
    <Box
      className="pageContainer"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Box className="contentWrap" sx={{ flex: 1 }}></Box>
    </Box>
  );
}
