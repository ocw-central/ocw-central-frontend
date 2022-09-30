import { Box, InputBase } from "@mui/material";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

import { theme } from "@/utils/themes";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
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
  setSearchParams: () => void;
}) => (
  <Search sx={{ background: "lightgrey" }}>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder={props.label}
      inputProps={{ "aria-label": "search" }}
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
  setSearchFaculty,
  setSearchTitle,
  setSearchAcademicField,
  onSearch,
}: {
  setSearchParams: () => void;
  setSearchTitle: Dispatch<SetStateAction<string>>;
  setSearchFaculty: Dispatch<SetStateAction<string>>;
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
        background: alpha(theme.palette.primary.main, 0.6),
        p: 6,
        mx: {
          md: 10,
          sm: 10,
          xs: 0,
        },
        borderRadius: 2,
        borderColor: alpha(theme.palette.primary.main, 1),
        borderStyle: "solid",
        borderWidth: 6,
      }}
    >
      <Box>
        <SearchBar
          label="講義タイトル"
          setValue={setSearchTitle}
          setSearchParams={setSearchParams}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexFlow: {
            xs: "column",
            md: "row",
          },
          px: {
            xs: 0,
            md: 2,
          },
          py: {
            xs: 0.5,
            md: 0.5,
          },
        }}
      >
        <SearchBar
          label="教授名"
          setValue={setSearchFaculty}
          setSearchParams={setSearchParams}
        />
        <SearchBar
          label="分野名"
          setValue={setSearchAcademicField}
          setSearchParams={setSearchParams}
        />
      </Box>
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
          borderRadius: 2,
        }}
      >
        <b>検索</b>
      </Button>
    </Box>
  );
};
