import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { alpha, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

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
      <AppBar position="static">
        <Toolbar>
          <ToSubjectsButton>
            <Link to="/subjects">講義検索</Link>
          </ToSubjectsButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "#fff" }}>
              OCW Central
            </Link>
          </Typography>
          <Search>
            <IconButton size="large" edge="start" color="inherit" aria-label="" sx={{ mr: 2 }}>
              <SearchIcon />
            </IconButton>
            <InputBase placeholder="講義名を検索" />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
