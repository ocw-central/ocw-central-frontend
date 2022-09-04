import { ReactComponent as Logo } from "@/assets/ocwc-owl.svg";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, InputBase } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Nav } from "src/components/common/Nav";

const Search = styled("div")(() => ({
  position: "relative",
  marginLeft: 0,
  backgroundColor: alpha("#fff", 0.15),
  "&:hover": {
    backgroundColor: alpha("#fff", 0.25),
  },
}));

const ToSubjectsButton = styled(Button)(() => ({
  backgroundColor: alpha("#fff", 0.9),
  "&:hover": {
    backgroundColor: alpha("#fff", 1),
  },
}));

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} className="Header">
      <AppBar position="static" sx={{ bgcolor: "primary.light" }}>
        <Toolbar>
          <Logo style={{ width: "50px", height: "50px" }} />
          <ToSubjectsButton>
            <Link to="/subjects">講義検索</Link>
          </ToSubjectsButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "#fff" }}>
              OCW Central
            </Link>
          </Typography>
          <Nav />
          <Search>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label=""
              sx={{ mr: 2 }}
            >
              <SearchIcon />
            </IconButton>
            <InputBase placeholder="講義名を検索" />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
