import { Box, InputBase } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

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
      <InputBase
        placeholder="講義名"
        sx={{ backgroundColor: "#ffffff", m: 4 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTitle(e.target.value)
        }
      />
      <button onClick={() => setSearchParams()}>検索</button>
    </Box>
  );
};
