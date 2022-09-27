import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function Loading() {
  return (
    <Box sx={{ display: "flex", marginTop: "2em" }}>
      <CircularProgress
        color={"primary"}
        size={"5em"}
        sx={{ margin: "auto" }}
      />
    </Box>
  );
}
