import { DetailedSearchBar } from "@/components/searchPageComponents/DetailedSearchBar";
import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import { useSubjectOnSearchPageQuery } from "@/generated/graphql";
import { Box, Grid, ImageList } from "@mui/material";
import { useRef, useState } from "react";
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
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error</div>;
    }
    if (!data) {
      return <div>該当講義がありません</div>;
    }
    if (data) {
      data.subjects.forEach((subject) => {
        GridItems.push(
          <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
            <SubjectCard {...subject} />
          </Grid>
        );
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
    <Box>
      <DetailedSearchBar
        setSearchParams={setSearchParams}
        setSearchTitle={setSearchTitle}
        setSearchFaculty={setSearchFaculty}
        setSearchAcademicField={setSearchAcademicField}
      />
      <ImageList variant="masonry" cols={3} gap={8}>
        {GridItems}
      </ImageList>
    </Box>
  );
}
