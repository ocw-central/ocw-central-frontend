import { Box, InputBase } from "@mui/material";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

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
}: {
  setSearchParams: () => void;
  setSearchTitle: Dispatch<SetStateAction<string>>;
  setSearchFaculty: Dispatch<SetStateAction<string>>;
  setSearchAcademicField: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 5,
        p: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SearchBar
        label="講義タイトル"
        setValue={setSearchTitle}
        setSearchParams={setSearchParams}
      />
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          m: 1,
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
        color="primary"
        onClick={() => setSearchParams()}
        size="large"
      >
        検索
      </Button>
    </Box>
  );
};
