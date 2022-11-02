import { Loading } from "@/components/common/Loading";
import { SubjectDetailSearchBar } from "@/components/searchPageComponents/SubjectDetailSearchBar";
import { SubjectSearchResults } from "@/components/searchPageComponents/SubjectSearchResults";
import { useSubjectOnSearchPageQuery } from "@/generated/graphql";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

type Params = {
  title?: string;
  faculty?: string;
  field?: string;
};

export function SubjectSearchPanel() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");
  const [searchAcademicField, setSearchAcademicField] = useState("");
  // check whether the search button has already clicked
  const [onSearch, setOnSearch] = useState(false);
  const navigate = useNavigate();
  const setSearchParams = () => {
    const params: Params = {
      title: searchTitle,
      faculty: searchFaculty,
      field: searchAcademicField,
    };
    const searchParams = createSearchParams(params);

    navigate(`?${searchParams}&subject`);
  };

  const [searchParams] = useSearchParams();
  const isSubjectSearch = searchParams.get("subject") !== null;

  const titleParam = searchParams.get("title");
  const title: string =
    titleParam !== null && isSubjectSearch ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string =
    facultyParam !== null && isSubjectSearch ? facultyParam : "";
  const academicFieldParam = searchParams.get("field");
  const field: string =
    academicFieldParam !== null && isSubjectSearch ? academicFieldParam : "";

  const { data, loading, error } = useSubjectOnSearchPageQuery({
    variables: {
      title: title,
      faculty: faculty,
      field: field,
    },
    skip: title === "" && faculty === "" && field === "",
  });
  if (loading) {
    return <Loading size={"7em"} color={"primary"} />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <Box>
      <SubjectDetailSearchBar
        setSearchParams={setSearchParams}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchFaculty={searchFaculty}
        setSearchFaculty={setSearchFaculty}
        searchAcademicField={searchAcademicField}
        setSearchAcademicField={setSearchAcademicField}
        onSearch={() => setOnSearch(true)}
      />
      {isSubjectSearch && onSearch && !title && !faculty && !field && (
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{ color: "black" }}
        >
          少なくとも一つの項目を入力してください
        </Typography>
      )}
      {(title || faculty || field) && (
        <SubjectSearchResults subjects={data?.subjects} />
      )}
    </Box>
  );
}
