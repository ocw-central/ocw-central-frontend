import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
type Props = {
  size: string;
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | undefined;
};

export function Loading(props: Props) {
  return (
    <Box sx={{ display: "flex", marginTop: "2em" }}>
      <CircularProgress
        color={props.color}
        size={props.size}
        sx={{ margin: "auto" }}
      />
    </Box>
  );
}
