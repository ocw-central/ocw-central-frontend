import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function Loading() {
  return (
    <Box sx={{ display: "flex", margin: "auto", marginTop: "2em" }}>
      <CircularProgress color={"primary"} size={"5em"} />
    </Box>
  );
}
