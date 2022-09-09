import { ReactComponent as Img } from "@/assets/ocwc-owl.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Box>
      <Img style={{ width: "50px", height: "50px" }} />

      <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "fantasy" }}>
        <Link to="/" style={{ color: "#fff" }}>
          OCW CENTRAL
        </Link>
      </Typography>
    </Box>
  );
}
