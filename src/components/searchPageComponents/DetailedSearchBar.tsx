import { Box, InputBase } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

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

const SearchBar = (props: {
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => (
  <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder={props.label}
      inputProps={{ "aria-label": "search" }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.setValue(e.target.value)
      }
    />
  </Search>
);

export const DetailedSearchBar = ({
  setSearchParams,
  setSearchFaculty,
  setSearchTitle,
  setSearchAcademicField,
}: {
  setSearchParams: () => void;
  setSearchTitle: Dispatch<SetStateAction<string>>;
  setSearchFaculty: Dispatch<SetStateAction<string>>;
  setSearchAcademicField: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Box border={1} sx={{ m: 5, p: 3, backgroundColor: "#5286AB" }}>
      <SearchBar label="講義タイトル" setValue={setSearchTitle} />
      <SearchBar label="教授名" setValue={setSearchFaculty} />
      <SearchBar label="分野名" setValue={setSearchAcademicField} />
      <button onClick={() => setSearchParams()}>検索</button>
    </Box>
  );
};
