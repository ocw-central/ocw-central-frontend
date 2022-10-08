import { Loading } from "@/components/common/Loading";
import { DetailedSearchBar } from "@/components/searchPageComponents/DetailedSearchBar";
import { SubjectGrid } from "@/components/subjectPageComponents/SubjectGrid";
import { useSubjectOnSearchPageQuery } from "@/generated/graphql";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AcademicFieldsList } from "./common/AcademicFieldsList";

type Params = {
  title?: string;
  faculty?: string;
  field?: string;
};

export function SearchPage() {
  const navigate = useNavigate();
  // クエリパラメータをもとに検索を行い、コンポーネントを書き換える
  const GridItems: JSX.Element[] = [];

  // 講義名検索結果を持つstate
  const [searchTitle, setSearchTitle] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");
  const [searchAcademicField, setSearchAcademicField] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [jpFieldOpen, setJpFieldOpen] = useState(false);
  const [enFieldOpen, setEnFieldOpen] = useState(false);

  // stateに基づきsearch parameterを切り替える関数
  const setSearchParams = () => {
    const params: Params = {
      title: searchTitle,
      faculty: searchFaculty,
      field: searchAcademicField,
    };
    const searchParams = createSearchParams(params);

    navigate(`?${searchParams}`);
  };

  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string = facultyParam !== null ? facultyParam : "";
  const academicFieldParam = searchParams.get("field");
  const field: string = academicFieldParam !== null ? academicFieldParam : "";

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
    <Grid container sx={{ dispplay: "flex" }}>
      <Grid
        xs={0}
        md={3}
        sx={{
          display: { xs: "none", md: "flex" },
          mb: 2,
          flexDirection: "column",
          height: 920,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <AcademicFieldsList
          jpFieldOpen={jpFieldOpen}
          setJpFieldOpen={setJpFieldOpen}
          enFieldOpen={enFieldOpen}
          setEnFieldOpen={setEnFieldOpen}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 900,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            m: {
              xs: 0,
              md: 4,
            },
            mb: 2,
          }}
        >
          <Typography variant="h5" component="div" align="left">
            <b>詳細検索</b>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <DetailedSearchBar
            setSearchParams={setSearchParams}
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
            searchFaculty={searchFaculty}
            setSearchFaculty={setSearchFaculty}
            searchAcademicField={searchAcademicField}
            setSearchAcademicField={setSearchAcademicField}
            onSearch={() => setOnSearch(true)}
          />
          {onSearch && !title && !faculty && !field && (
            <Typography variant="h5" component="div" align="center">
              少なくとも一つの項目を入力してください
            </Typography>
          )}
          {(title || faculty || field) && (
            <SubjectGrid subjects={data?.subjects} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
