import { useSubjectOnSearchPageQuery } from "@/generated/graphql";
import { Box, Grid, InputBase } from "@mui/material";
import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SubjectCard } from "./searchPageComponents/SubjectCard";

type Params = {
  title?: string;
  faculty?: string;
  academic_fields?: string;
};

const ChangeGridItems = () => {
  const GridItems: JSX.Element[] = [];
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string = facultyParam !== null ? facultyParam : "";
  const academicFieldParam = searchParams.get("field");
  const academic_field: string =
    academicFieldParam !== null ? academicFieldParam : "";
  const { data, loading, error } = useSubjectOnSearchPageQuery({
    variables: {
      title: title,
      faculty: faculty,
      academicField: academic_field,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>useSubjectOnSearchPageQuery failed in SearchPage.tsx</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  data.subjects.forEach((subject) => {
    GridItems.push(
      <Grid item xs={12} sm={6} md={4} key={subject.id}>
        <SubjectCard {...subject} />
      </Grid>
    );
  });
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
      academic_fields: searchAcademicField,
    };
    const searchParams = createSearchParams(params);

    navigate(`?${searchParams}`);
  };

  return (
    <Box>
      <Box border={1} sx={{ m: 5, p: 3, backgroundColor: "#5286AB" }}>
        <InputBase
          placeholder="講義名"
          sx={{ backgroundColor: "#ffffff", m: 4 }}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={() => setSearchParams()}>検索</button>
      </Box>
      <Grid container spacing={1}>
        {GridItems}
      </Grid>
    </Box>
  );
}
