import { Loading } from "@/components/common/Loading";
import { DetailedSearchBar } from "@/components/searchPageComponents/DetailedSearchBar";
import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import { useSubjectOnSearchPageQuery } from "@/generated/graphql";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
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

const ChangeGridItems = () => {
  const GridItems: JSX.Element[] = [];
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string = facultyParam !== null ? facultyParam : "";
  const academicFieldParam = searchParams.get("field");
  const field: string = academicFieldParam !== null ? academicFieldParam : "";
  const mounted = useRef(false);
  const { data, loading, error } = useSubjectOnSearchPageQuery({
    variables: {
      title: title,
      faculty: faculty,
      field: field,
    },
    skip: title === "" && faculty === "" && field === "",
  });
  if (mounted.current) {
    if (loading) {
      return <Loading size={"10em"} color={"primary"} />;
    }
    if (error) {
      return <div>Error</div>;
    }
    if (!data) {
      return <div>該当講義がありません</div>;
    }
    if (data) {
      data.subjects.forEach((subject) => {
        GridItems.push(<SubjectCard {...subject} />);
      });
    }
  }
  mounted.current = true;
  return GridItems;
};

export function SearchPage() {
  const navigate = useNavigate();
  // クエリパラメータをもとに検索を行い、コンポーネントを書き換える
  const GridItems = ChangeGridItems();

  // 講義名検索結果を持つstate
  const [searchTitle, setSearchTitle] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");
  const [searchAcademicField, setSearchAcademicField] = useState("");

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

  return (
    <Grid container>
      <Grid
        container
        xs={0}
        md={3}
        sx={{
          display: { xs: "none", md: "flex" },
          mb: 2,
          flexDirection: "column",
          height: 700,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <AcademicFieldsList inNav={false} />
      </Grid>

      <Grid item xs={12} md={9}>
        <Box
          sx={{
            m: {
              xs: 0,
              md: 4,
            },
            mb: 2,
            display: "flex",
            flexDirection: "column",
            height: 700,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Typography variant="h5" component="div" align="left">
            <b>詳細検索</b>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <DetailedSearchBar
            setSearchParams={setSearchParams}
            setSearchTitle={setSearchTitle}
            setSearchFaculty={setSearchFaculty}
            setSearchAcademicField={setSearchAcademicField}
          />
          <Grid container>{GridItems}</Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
