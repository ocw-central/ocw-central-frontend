import { Box, Grid, InputBase } from "@mui/material";
import { useState } from "react";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import { SubjectCard } from "./subjectsPageComponents/SubjectCard";
import { MockSubjects } from "../mock/MockSubjects";

type Params = {
  title?: string;
};

// 実際には検索を行い検索結果をもとにGridItems書き換える
const ChangeGridItems = () => {
  const GridItems: JSX.Element[] = [];
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  if (title) {
    for (const subject of MockSubjects) {
      const GridItem = (
        <Grid item>
          <SubjectCard subject={subject} />
        </Grid>
      );
      GridItems.push(GridItem);
    }
  }
  return GridItems;
};

export function SubjectsPage() {
  const navigate = useNavigate();
  // クエリパラメータをもとに検索を行い、コンポーネントを書き換える
  const GridItems: JSX.Element[] = ChangeGridItems();

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
      <Box border={1} sx={{ m: 5, p: 3, backgroundColor: "primary.main" }}>
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
