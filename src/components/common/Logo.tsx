import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Box>
      

      <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "fantasy" }}>
        <Link to="/" style={{ color: "#fff" }}>
          OCW CENTRAL
        </Link>
      </Typography>
    </Box>
  );
}
