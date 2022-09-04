import { Link } from "react-router-dom";
import { ReactComponent as Img } from "@/assets/ocwc-owl.svg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function Logo(){
    return (
        <Box sx={{ flexGrow: 1 }} className="Header">
            <Img style={{ width: "50px", height: "50px" }} />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ color: "#fff" }}>
                OCW CENTRAL
                </Link>
            </Typography>
        </Box>
    )
}