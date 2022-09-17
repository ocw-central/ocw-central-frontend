import { Subject, useSubjectsQuery } from "@/generated/graphql";
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
};

type Props = {
  subject: Subject;
};

const ChangeGridItems = () => {
  const GridItems: JSX.Element[] = [];
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title")!;

  const { data, loading, error } = useSubjectsQuery({
    variables: {
      title: title,
      faculty: "",
      academicField: "",
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  data.subjects.forEach((subject) => {
    GridItems.push(
      <Grid item xs={12} sm={6} md={4} key={subject.id}>
        <SubjectCard subject={subject} />
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
  // stateに基づきsearch parameterを切り替える関数
  const setSearchParams = () => {
    const params: Params = {
      title: searchTitle,
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