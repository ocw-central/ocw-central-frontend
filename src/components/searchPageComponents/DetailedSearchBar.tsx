import { Box, Grid, InputBase, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  width: "100%",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
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
      height: "2.5em",
      mb: "1em",
    },
  },
}));

const SearchBar = (props: {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setSearchParams: () => void;
}) => (
  <Search sx={{ background: "lightgrey" }}>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder={props.label}
      inputProps={{ "aria-label": "search" }}
      value={props.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.setValue(e.target.value)
      }
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          props.setSearchParams();
        }
      }}
    />
  </Search>
);

export const DetailedSearchBar = ({
  setSearchParams,
  searchFaculty,
  setSearchFaculty,
  searchTitle,
  setSearchTitle,
  searchAcademicField,
  setSearchAcademicField,
  onSearch,
}: {
  setSearchParams: () => void;
  searchTitle: string;
  setSearchTitle: Dispatch<SetStateAction<string>>;
  searchFaculty: string;
  setSearchFaculty: Dispatch<SetStateAction<string>>;
  searchAcademicField: string;
  setSearchAcademicField: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 6,
        mx: {
          md: 10,
          sm: 10,
          xs: 0,
        },
      }}
    >
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} sm={12} md={4}>
          <SearchBar
            label="講義タイトル"
            value={searchTitle}
            setValue={setSearchTitle}
            setSearchParams={setSearchParams}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <SearchBar
            label="教授名"
            value={searchFaculty}
            setValue={setSearchFaculty}
            setSearchParams={setSearchParams}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <SearchBar
            label="分野名"
            value={searchAcademicField}
            setValue={setSearchAcademicField}
            setSearchParams={setSearchParams}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        aria-label="search"
        onClick={() => {
          setSearchParams();
          onSearch();
        }}
        size="large"
        sx={{
          mt: 2,
          width: "15em",
          height: "3em",
        }}
      >
        <Typography variant="h6">
          <b>検索</b>
        </Typography>
      </Button>
    </Box>
  );
};
