import { ReactComponent as OwlImg } from "@/assets/ocwc-owl.svg";
import { Nav } from "@/components/HeaderComponents/Nav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Container, InputBase, Toolbar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function Header() {
  const navigate = useNavigate();
  const onEnterDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // ensure that the e.target is an input element
      const title = (e.target as HTMLInputElement).value;
      const searchParames = createSearchParams({ title });
      navigate(`/search/?${searchParames}`);
    }
  };
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ position: "sticky", top: "0", zIndex: 1 }}>
      <AppBar position="static" sx={{ height: "3.5em" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box mr={2}>
              <Link to="/">
                <OwlImg
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </Link>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={`${t("header.search_bar")}`}
                inputProps={{ "aria-label": "search" }}
                onKeyDown={(e) => {
                  onEnterDown(e);
                }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }}></Box>
            <LanguageSwitcher />
            <Nav />
            {/* for PC */}
            <Box
              sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
            ></Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
